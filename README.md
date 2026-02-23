# Pushpraj Pandey — Portfolio with AI Chat

A personal portfolio website with an **AI-powered chat feature** that lets visitors interact with my resume through natural language questions.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 17 + TypeScript, Styled Components |
| **Backend** | Python 3.13, FastAPI |
| **Database** | SQLite (dev) / PostgreSQL (prod, via SQLAlchemy) |
| **AI Chat** | OpenRouter API (free models with automatic fallback) |
| **Hosting** | Vercel (frontend) + Railway (backend) |

## Project Structure

```
Portfolio/
├── backend/                 # Python FastAPI server
│   ├── main.py              # API endpoints + global error handling
│   ├── database.py          # SQLAlchemy engine & session
│   ├── models.py            # ChatMessage & ResumeSection models
│   ├── seed_resume.py       # Populate DB with resume data
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Container build for Railway
│   ├── Procfile             # Railway process file
│   ├── railway.toml         # Railway deploy config
│   ├── .env                 # OPENROUTER_API_KEY (create from .env.example)
│   └── .env.example
├── src/                     # React frontend
│   ├── components/
│   │   ├── Chat/            # AI Chat widget (bubble + panel)
│   │   ├── ErrorBoundary/   # React error boundary
│   │   ├── Header/          # Navigation bar
│   │   ├── Hero/            # Landing section
│   │   ├── About/           # About me + skills
│   │   ├── Project/         # Portfolio projects
│   │   ├── Contact/         # Contact form
│   │   ├── Footer/          # Site footer
│   │   └── Form/            # Formspree contact form
│   ├── App.tsx
│   └── index.tsx
├── vercel.json              # Vercel deploy config
├── .env                     # REACT_APP_CHAT_API_URL
└── package.json
```

## Setup & Run

### 1. Backend (Python)

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your OpenRouter API key
# Get a free key at: https://openrouter.ai/keys

# Seed the database with resume data
python seed_resume.py

# Start the API server
uvicorn main:app --reload --port 8000
```

### 2. Frontend (React)

```bash
# From the project root
npm install
npm start
```

The React app runs on `http://localhost:3000` and talks to the backend at `http://localhost:8000`.

### Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | `backend/.env` | Your OpenRouter API key ([get one free](https://openrouter.ai/keys)) |
| `OPENROUTER_MODELS` | `backend/.env` | (Optional) Comma-separated list of free models to try |
| `ALLOWED_ORIGINS` | `backend/.env` | (Optional) Comma-separated CORS origins |
| `PORT` | `backend/.env` | (Optional) Server port. Default: `8000` |
| `DATABASE_URL` | `backend/.env` | (Optional) DB connection string. Default: SQLite |
| `REACT_APP_CHAT_API_URL` | `.env` | Backend API URL. Default: `http://localhost:8000` |

## Features

- **Interactive AI Chat**: Floating chat widget where visitors can ask questions about my resume
- **Model Fallback Chain**: Automatically cycles through 8 free OpenRouter models for reliability
- **Global Error Handling**: Backend exception handlers + React ErrorBoundary for graceful errors
- **Conversation History**: Chat sessions are stored in the database with session IDs
- **Dark/Light Theme**: Toggle between themes (chat widget adapts too)
- **Responsive Design**: Works on desktop and mobile
- **Particle Background**: Animated tech icons
- **Contact Form**: Powered by Formspree
- **Project Showcase**: 6 featured projects with GitHub links

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/chat` | Send a message, get AI response |
| `GET` | `/api/chat/history?session_id=...` | Get chat history for a session |
| `GET` | `/api/resume` | Get all resume sections |

## Deployment

### Frontend → Vercel

1. Push the repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. **Root Directory**: leave as `.` (Vercel detects CRA automatically).
4. Add the environment variable:
   - `REACT_APP_CHAT_API_URL` = `https://your-backend.up.railway.app`
5. Deploy. The included `vercel.json` handles SPA rewrites.

### Backend → Railway

1. In [Railway](https://railway.app), create a **New Project → Deploy from GitHub repo**.
2. Set the **Root Directory** to `backend`.
3. Add environment variables:
   - `OPENROUTER_API_KEY` = your key from [openrouter.ai/keys](https://openrouter.ai/keys)
   - `ALLOWED_ORIGINS` = `https://your-domain.vercel.app,https://your-custom-domain.com`
4. Railway auto-detects the `Dockerfile` / `Procfile` and deploys.
5. On first deploy the database is seeded via `seed_resume.py` (Dockerfile `RUN` step).
6. (Optional) Attach a Railway PostgreSQL plugin and set `DATABASE_URL` for persistent storage.
