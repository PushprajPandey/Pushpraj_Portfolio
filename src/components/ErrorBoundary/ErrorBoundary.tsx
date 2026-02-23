import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
  color: #fff;

  .light & {
    color: #212121;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: var(--green);
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.8;
    max-width: 480px;
  }

  button {
    padding: 0.75rem 2rem;
    background: var(--green);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }
`;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, info.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h2>Something went wrong</h2>
          <p>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button onClick={this.handleReload}>Refresh Page</button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
