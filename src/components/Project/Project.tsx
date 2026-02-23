import { Container } from "./styles";
import githubIcon from "../../assets/github.svg";
//import externalLink from "../../assets/external-link.svg"
import ScrollAnimation from "react-animate-on-scroll";

export function Project() {
  return (
    <Container id="project">
      <h2>My Projects</h2>
      <div className="projects">
        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#23ce6b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a
                  href="https://github.com/PushprajPandey/Rentyor"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" />
                </a>
                {/* <a href="https://velorent.vercel.app" target="_blank" rel="noreferrer">
                  <img src={externalLink} alt="Visit site" />
                </a> */}
              </div>
            </header>
            <div className="body">
              <h3>Rentyor</h3>
              <p>
                Car Rental Platform Developed full-stack serving 30+ users with
                JWT authentication, real-time booking system, and Stripe payment
                integration. Built responsive React frontend with Redux state
                management, processing 50+ daily transactions with 99.8% success
                rate.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>React.js</li>
                <li>Node.js</li>
                <li>MongoDB</li>
                <li>Stripe API</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#23ce6b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a
                  href="https://github.com/PushprajPandey/PennyPilot"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" />
                </a>
                {/* <a href="https://expense-tracker-rauneet.vercel.app" target="_blank" rel="noreferrer">
                  <img src={externalLink} alt="Visit site" />
                </a> */}
              </div>
            </header>
            <div className="body">
              <h3>PennyPilot</h3>
              <p>
                Developed full-stack expense management application handling
                100+ expense entries with JWT authentication and real-time
                wallet updates. Created responsive React dashboard with CRUD
                operations, enabling users to track expenses across 15+
                categories with 95% data accuracy.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>React.js</li>
                <li>MongoDB</li>
                <li>Node.js</li>
                <li>Chart.js</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#23ce6b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a
                  href="https://github.com/PushprajPandey/MedSync"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" />
                </a>
                {/* <a href="https://typerush-game.vercel.app" target="_blank" rel="noreferrer">
                  <img src={externalLink} alt="Visit site" />
                </a> */}
              </div>
            </header>
            <div className="body">
              <h3>MedSync</h3>
              <p>
                Smart Hospital Management System built end-to-end healthcare
                management solution covering 6+ departments with real-time OPD
                queue tracking and automated appointment scheduling across
                facilities. Facilitated care for 10+ users via digital
                registration, intelligent admissions, and AI chatbot support
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>React.js</li>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#23ce6b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a
                  href="https://github.com/PushprajPandey/Crime-Scan"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" />
                </a>
                {/* <a href="https://mcq-generator-demo.vercel.app" target="_blank" rel="noreferrer">
                  <img src={externalLink} alt="Visit site" />
                </a> */}
              </div>
            </header>
            <div className="body">
              <h3>Crime-Scan</h3>
              <p>
                Developed AI-powered criminal face recognition system achieving
                95% accuracy in real-time facial identification using OpenCV and
                machine learning algorithms. Built cross-platform desktop
                application with MySQL integration, processing 100+ face samples
                per criminal for law enforcement suspect identification
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>Python</li>
                <li>SQL</li>
                <li>JavaScript</li>
                <li>Shell</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#23ce6b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a
                  href="https://github.com/PushprajPandey/Serverless-Voting-Application"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" />
                </a>
              </div>
            </header>
            <div className="body">
              <h3>Serverless Voting Application for Programming Languages</h3>
              <p>
                Developed a serverless voting app using React, AWS Lambda, API
                Gateway, and DynamoDB, enabling users to view programming
                languages, cast votes, and access details through an interactive
                UI, leveraging serverless architecture for scalability and
                cost-efficiency.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>AWS Lambda</li>
                <li>API Gateway</li>
                <li>DynamoDB</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg
                width="50"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#23ce6b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <div className="project-links">
                <a
                  href="https://github.com/PushprajPandey/GeniusBot-AI-Chatbot-Assistant"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" />
                </a>
                {/* <a href="https://ai-chatbot-t8fn.onrender.com" target="_blank" rel="noreferrer">
                  <img src={externalLink} alt="Visit site" />
                </a> */}
              </div>
            </header>
            <div className="body">
              <h3>GeniusBot: AI-Powered Assistance with PDF Insight</h3>
              <p>
                Developed an interactive chatbot application using Streamlit,
                OpenAI's GPT-3.5-turbo language model, and PyPDF2 for PDF text
                extraction, enabling users to ask context-based questions on
                uploaded PDFs and general queries.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>Streamlit</li>
                <li>PyPDF2</li>
                <li>LangChain</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>
      </div>
    </Container>
  );
}
