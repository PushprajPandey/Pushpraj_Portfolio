import React, { Suspense, lazy } from 'react'
// import { useEffect } from 'react'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Chat } from './components/Chat/Chat'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { GlobalStyle } from './styles/global'
import 'react-toastify/dist/ReactToastify.css'

// Lazy-load analytics so ad-blocker failures don't break the app
const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((mod) => ({ default: mod.Analytics })).catch(() => ({ default: () => null }))
);

function App() {
  return (
    <ErrorBoundary>
      <GlobalStyle></GlobalStyle>
      <Header></Header>
      <Main></Main>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <Footer></Footer>
      <Chat />
    </ErrorBoundary>
  )
}

export default App
