import { Container } from './styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useState } from 'react'
import Resume from '../../assets/Pushpraj_Pandey_Resume.pdf'
export function Header() {
  const [isActive, setActive] = useState(false)
  function toggleTheme() {
    let html = document.getElementsByTagName('html')[0]
    html.classList.toggle('light')
  }
  function closeMenu() {
    setActive(false)
  }
  return (
    <Container className="header-fixed">
      <Router>
        <HashLink smooth to="#home" className="logo">
          <span>{"<Pushpraj "}</span>
          <span>{" Pandey/>"}</span>
        </HashLink>
        <input
          onChange={toggleTheme}
          className="container_toggle"
          type="checkbox"
          id="switch"
          name="mode"
        />
        <label htmlFor="switch">Toggle</label>
        <nav className={isActive ? 'active' : ''}>
          <HashLink smooth to="#home" onClick={closeMenu}>
            Home
          </HashLink>
          <HashLink smooth to="#about" onClick={closeMenu}>
            About me
          </HashLink>
          <HashLink smooth to="#project" onClick={closeMenu}>
            Project
          </HashLink>
          <HashLink smooth to="#contact" onClick={closeMenu}>
            Contact
          </HashLink>
          <a href={Resume} download className="button">
            Resume
          </a>
        </nav>
        <div
          aria-expanded={isActive ? 'true' : 'false'}
          aria-haspopup="true"
          aria-label={isActive ? 'Fechar menu' : 'Abrir menu'}
          className={isActive ? 'menu active' : 'menu'}
          onClick={() => {
            setActive(!isActive)
          }}
        ></div>
      </Router>
    </Container>
  )
}
