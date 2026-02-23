import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.08); }
`;

export const ChatBubble = styled.button`
  position: fixed;
  bottom: 2.8rem;
  right: 2.8rem;
  z-index: 9999;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--green);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(35, 206, 107, 0.45);
  transition: background 0.25s, transform 0.25s;
  animation: ${pulse} 3s ease-in-out infinite;

  &:hover {
    background: var(--blue);
    transform: scale(1.1);
    animation: none;
  }

  svg {
    width: 28px;
    height: 28px;
    fill: #fff;
  }
`;

export const ChatWindow = styled.div`
  position: fixed;
  bottom: 6.4rem;
  right: 2.8rem;
  z-index: 9998;
  width: 400px;
  max-width: calc(100vw - 2rem);
  height: 540px;
  max-height: calc(100vh - 8rem);
  background: #1e1e1e;
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.55);
  animation: ${fadeIn} 0.3s ease-out;
  transition: background 0.5s, box-shadow 0.5s;

  .light & {
    background: #ffffff;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    width: calc(100vw - 1.6rem);
    height: calc(100vh - 6rem);
    bottom: 0.8rem;
    right: 0.8rem;
    border-radius: 1.2rem;
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
  background: var(--green);
  color: #fff;

  h4 {
    font-size: 1.6rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  button {
    background: none;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: opacity 0.2s;
    &:hover { opacity: 0.7; }
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Scrollbar */
  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }

  .light & {
    &::-webkit-scrollbar-thumb { background: #ccc; }
  }
`;

export const Message = styled.div<{ $isUser: boolean }>`
  max-width: 82%;
  padding: 1rem 1.4rem;
  border-radius: ${({ $isUser }) =>
    $isUser ? "1.4rem 1.4rem 0.4rem 1.4rem" : "1.4rem 1.4rem 1.4rem 0.4rem"};
  background: ${({ $isUser }) => ($isUser ? "var(--green)" : "#2b2b2b")};
  color: #fff;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  font-size: 1.4rem;
  line-height: 1.55;
  word-wrap: break-word;
  white-space: pre-wrap;
  transition: background 0.5s, color 0.5s;

  .light & {
    background: ${({ $isUser }) => ($isUser ? "var(--green)" : "#e8e8e8")};
    color: ${({ $isUser }) => ($isUser ? "#fff" : "var(--black)")};
  }
`;

const dotBounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
`;

export const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 1rem 1.4rem;
  align-self: flex-start;
  background: #2b2b2b;
  border-radius: 1.4rem 1.4rem 1.4rem 0.4rem;
  max-width: 60px;
  transition: background 0.5s;

  .light & {
    background: #e8e8e8;
  }

  span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--green);
    animation: ${dotBounce} 1.2s infinite;
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
`;

export const ChatInputArea = styled.form`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  gap: 0.6rem;
  border-top: 1px solid #333;
  background: #1e1e1e;
  transition: background 0.5s, border-color 0.5s;

  .light & {
    background: #ffffff;
    border-top-color: #ddd;
  }

  input {
    flex: 1;
    padding: 1rem 1.4rem;
    border-radius: 2rem;
    border: 1px solid #444;
    background: #2b2b2b;
    color: #fff;
    font-size: 1.4rem;
    outline: none;
    transition: border-color 0.2s, background 0.5s, color 0.5s;

    &::placeholder { color: #888; }
    &:focus { border-color: var(--green); }

    .light & {
      background: #f0f0f0;
      border-color: #ccc;
      color: var(--black);
      &::placeholder { color: #999; }
    }
  }

  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;

    svg {
      width: 18px;
      height: 18px;
      fill: #fff;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;

export const WelcomeMessage = styled.div`
  text-align: center;
  padding: 2rem 1.6rem;
  color: #aaa;
  font-size: 1.3rem;
  line-height: 1.6;
  transition: color 0.5s;

  .light & {
    color: #666;
  }

  h3 {
    color: var(--green);
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
  }

  .suggestions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.2rem;
  }

  .suggestion {
    background: #2b2b2b;
    border: 1px solid #444;
    border-radius: 1rem;
    padding: 0.8rem 1.2rem;
    color: #ccc;
    font-size: 1.3rem;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    text-align: left;

    &:hover {
      background: #333;
      border-color: var(--green);
      color: #fff;
    }

    .light & {
      background: #f0f0f0;
      border-color: #ddd;
      color: #555;

      &:hover {
        background: #e0e0e0;
        border-color: var(--green);
        color: var(--black);
      }
    }
  }
`;
