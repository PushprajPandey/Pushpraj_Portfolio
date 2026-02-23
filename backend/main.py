import logging
import os
import sys
import traceback
import uuid
from datetime import datetime
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Base, engine, get_db, SessionLocal
from models import ChatMessage, ResumeSection

load_dotenv()

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
)
logger = logging.getLogger("portfolio-api")

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio Chat API", version="1.0.0")


@app.on_event("startup")
def seed_resume_on_startup():
    """Ensure resume data is seeded in the runtime database."""
    from seed_resume import seed
    db = SessionLocal()
    try:
        count = db.query(ResumeSection).count()
        if count == 0:
            logger.info("No resume data found — seeding database…")
            seed()
            logger.info("Resume data seeded successfully.")
        else:
            logger.info("Resume data already present (%d sections).", count)
    finally:
        db.close()

# CORS — allow deployed Vercel frontend + localhost for dev
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5173,https://pushprajpandey.in,https://www.pushprajpandey.in,https://pushpraj-portfolio-five.vercel.app",
).split(",")

# Also allow all Vercel preview deployment URLs
ALLOWED_ORIGIN_REGEX = os.getenv(
    "ALLOWED_ORIGIN_REGEX",
    r"https://.*\.vercel\.app",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=ALLOWED_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Global error handlers
# ---------------------------------------------------------------------------


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.warning("HTTPException %s on %s: %s", exc.status_code, request.url.path, exc.detail)
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": True, "detail": exc.detail},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.error(
        "Unhandled error on %s %s:\n%s",
        request.method,
        request.url.path,
        traceback.format_exc(),
    )
    return JSONResponse(
        status_code=500,
        content={"error": True, "detail": "Internal server error. Please try again later."},
    )


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info("→ %s %s", request.method, request.url.path)
    response = await call_next(request)
    logger.info("← %s %s %s", request.method, request.url.path, response.status_code)
    return response

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# Ordered list of free models to try (non-reasoning models first for speed)
FREE_MODELS = [
    m.strip()
    for m in os.getenv(
        "OPENROUTER_MODELS",
        "qwen/qwen3-4b:free,"
        "mistralai/mistral-small-3.1-24b-instruct:free,"
        "nvidia/nemotron-nano-9b-v2:free,"
        "stepfun/step-3.5-flash:free,"
        "arcee-ai/trinity-mini:free,"
        "z-ai/glm-4.5-air:free,"
        "deepseek/deepseek-r1-0528:free",
    ).split(",")
    if m.strip()
]

# ---------------------------------------------------------------------------
# Pydantic schemas
# ---------------------------------------------------------------------------


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str


class HistoryItem(BaseModel):
    role: str
    content: str
    created_at: datetime


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _build_resume_context(db: Session) -> str:
    """Concatenate all resume sections into a single context string."""
    sections = db.query(ResumeSection).all()
    if not sections:
        return "No resume data available."
    return "\n\n".join(
        f"### {s.section.replace('_', ' ').title()}\n{s.content}" for s in sections
    )


SYSTEM_PROMPT_TEMPLATE = """You are an AI assistant embedded in Pushpraj Pandey's portfolio website.
Your sole purpose is to answer questions about Pushpraj's resume, skills, experience, projects, and education.
Be friendly, professional, and concise. If a question is unrelated to Pushpraj's background, politely redirect the user.

Here is Pushpraj's full resume information:

{resume_context}

Answer based ONLY on the information above. If you don't know something that isn't covered in the resume, say so honestly.
"""


async def _call_openrouter(messages: list[dict]) -> str:
    """Try each free model in the fallback chain until one succeeds."""
    if not OPENROUTER_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="OPENROUTER_API_KEY is not configured on the server.",
        )

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://pushprajpandey.in",
        "X-Title": "Pushpraj Pandey Portfolio Chat",
    }

    last_error = ""
    async with httpx.AsyncClient(timeout=30) as client:
        for model in FREE_MODELS:
            payload = {
                "model": model,
                "messages": messages,
                "max_tokens": 2048,
                "temperature": 0.7,
            }
            try:
                resp = await client.post(
                    OPENROUTER_URL, json=payload, headers=headers
                )
                if resp.status_code == 200:
                    data = resp.json()
                    msg = data.get("choices", [{}])[0].get("message", {})
                    # Try content first, fall back to reasoning (for R1-style models)
                    content = msg.get("content") or msg.get("reasoning") or ""
                    content = content.strip()
                    if content:
                        logger.info("Model %s succeeded", model)
                        return content
                last_error = f"{model}: {resp.status_code} {resp.text[:200]}"
                logger.warning("Model %s failed — %s", model, last_error)
            except httpx.TimeoutException:
                last_error = f"{model}: timeout"
                logger.warning("Model %s timed out, trying next…", model)
            except Exception as exc:
                last_error = f"{model}: {exc}"
                logger.error("Model %s error: %s", model, exc)

    raise HTTPException(
        status_code=502,
        detail=f"All models failed. Last error: {last_error}",
    )


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest, db: Session = Depends(get_db)):
    session_id = req.session_id or str(uuid.uuid4())

    # Build system prompt with resume context
    resume_context = _build_resume_context(db)
    system_msg = {
        "role": "system",
        "content": SYSTEM_PROMPT_TEMPLATE.format(resume_context=resume_context),
    }

    # Fetch recent conversation history (last 20 messages for context)
    history = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .limit(20)
        .all()
    )

    messages = [system_msg]
    for msg in history:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": req.message})

    # Call OpenRouter
    reply = await _call_openrouter(messages)

    # Persist user message & assistant reply
    db.add(ChatMessage(session_id=session_id, role="user", content=req.message))
    db.add(ChatMessage(session_id=session_id, role="assistant", content=reply))
    db.commit()

    return ChatResponse(reply=reply, session_id=session_id)


@app.get("/api/chat/history", response_model=list[HistoryItem])
def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )
    return [
        HistoryItem(role=m.role, content=m.content, created_at=m.created_at)
        for m in messages
    ]


@app.get("/api/resume")
def get_resume(db: Session = Depends(get_db)):
    sections = db.query(ResumeSection).all()
    return [{"section": s.section, "content": s.content} for s in sections]


# ---------------------------------------------------------------------------
# Entrypoint (Railway / local)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    logger.info("Starting server on port %s", port)
    uvicorn.run("main:app", host="0.0.0.0", port=port)
