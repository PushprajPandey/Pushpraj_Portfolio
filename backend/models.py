from sqlalchemy import Column, Integer, String, Text, DateTime, func
from database import Base


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    session_id = Column(String(64), index=True, nullable=False)
    role = Column(String(16), nullable=False)  # "user" or "assistant"
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)


class ResumeSection(Base):
    __tablename__ = "resume_sections"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    section = Column(String(64), nullable=False)
    content = Column(Text, nullable=False)
