import React from 'react'
// import { useEffect } from 'react'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Chat } from './components/Chat/Chat'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { GlobalStyle } from './styles/global'
import { Analytics } from "@vercel/analytics/react"

import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <ErrorBoundary>
      <GlobalStyle></GlobalStyle>
      <Header></Header>
      <Main></Main>
      <Analytics />
      <Footer></Footer>
      <Chat />
    </ErrorBoundary>
  )
}

export default App
