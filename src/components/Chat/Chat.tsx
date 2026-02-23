import React, { useState, useRef, useEffect, FormEvent } from "react";
import {
  ChatBubble,
  ChatWindow,
  ChatHeader,
  ChatMessages,
  ChatInputArea,
  Message,
  TypingIndicator,
  WelcomeMessage,
} from "./styles";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

const RAW_API_URL = process.env.REACT_APP_CHAT_API_URL || "http://localhost:8000";
// Ensure the URL has a protocol prefix so fetch() doesn't treat it as a relative path
const API_URL = RAW_API_URL.startsWith("http") ? RAW_API_URL : `https://${RAW_API_URL}`;

const SUGGESTIONS = [
  "What are Pushpraj's main skills?",
  "Tell me about his projects",
  "What is his work experience?",
  "What is his education background?",
];

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMsg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          session_id: sessionId,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setSessionId(data.session_id);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      {/* Floating chat bubble */}
      <ChatBubble
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Chat with AI about my resume"}
        title="Ask AI about my resume"
      >
        {isOpen ? (
          // Close icon
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          // Chat icon
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        )}
      </ChatBubble>

      {/* Chat panel */}
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <h4>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#fff"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              AI Resume Chat
            </h4>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              ×
            </button>
          </ChatHeader>

          <ChatMessages>
            {messages.length === 0 && !loading && (
              <WelcomeMessage>
                <h3>Hi there! 👋</h3>
                <p>
                  I'm an AI assistant that knows everything about Pushpraj's
                  resume. Ask me anything!
                </p>
                <div className="suggestions">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      className="suggestion"
                      onClick={() => handleSuggestion(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </WelcomeMessage>
            )}

            {messages.map((msg, i) => (
              <Message key={i} $isUser={msg.role === "user"}>
                {msg.content}
              </Message>
            ))}

            {loading && (
              <TypingIndicator>
                <span />
                <span />
                <span />
              </TypingIndicator>
            )}

            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInputArea onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Pushpraj's resume…"
              disabled={loading}
              autoFocus
            />
            <button type="submit" disabled={!input.trim() || loading}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </ChatInputArea>
        </ChatWindow>
      )}
    </>
  );
}
