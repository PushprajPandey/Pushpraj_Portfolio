import { Container } from "./styles";
import PushprajPandey from "../../assets/PushprajPandey.webp";
import python from "../../assets/python.svg"
import java from "../../assets/java.svg"
//import wordpress from "../../assets/wordpress.svg";
import fastapi from "../../assets/fastapi.svg";
import htmlIcon from "../../assets/html-icon.svg";
import cssIcon from "../../assets/css-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import sql from "../../assets/sql.svg";
import powerbi from "../../assets/powerbi.svg";
import ScrollAnimation from "react-animate-on-scroll";

export function About() {
  return (
    <Container id="about">
      <div className="about-text">
        <ScrollAnimation animateIn="fadeInLeft">
          <h2>About me</h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInLeft" delay={0.1 * 1000}>
          <p>
            Hi there! I'm Pushpraj Pandey, a passionate DevOps Engineer, Full-Stack Developer and Computer Science student with a strong foundation in building scalable web applications and data-driven solutions.
          </p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInLeft" delay={0.2 * 1000} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <p>
            I specialize in React.js, Node.js, and MongoDB, with experience in developing real-time applications that serve hundreds of users. My expertise extends to integrating AI capabilities, optimizing database performance, and creating responsive user experiences. I'm proficient in multiple programming languages including Python, Java, JavaScript, and have hands-on experience with modern frameworks and cloud technologies.
          </p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInLeft" delay={0.3 * 1000}>
          <p>
            I've solved 150+ DSA problems on LeetCode and contributed to multiple open-source projects, constantly pushing myself to learn and grow in the ever-evolving tech landscape.
          </p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInLeft" delay={400}>
          <div className="education">
            <h3>Education:</h3>
            <h4> Bachelor's of Technology</h4>
            <p>VIT | Sep 2022 - May 2026</p>
          </div>
        </ScrollAnimation>
       <ScrollAnimation animateIn="fadeInLeft" delay={500}>
          <div className="experience">
            <h3>Experience:</h3>
            <h4>Full-Stack Developer MERN</h4>
            <p>SmartBridge | January 2025 - March 2025</p>
            <ul>
              <li>Built expense tracker application managing 100+ transaction records with real-time data visualization.</li>
              <li>Integrated generative AI capabilities reducing manual data entry by 60%.</li>
              <li>Optimized MongoDB performance achieving 40% faster query performance.</li>
            </ul>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.4 * 1000}>
          <h3>Here are my main skills:</h3>
        </ScrollAnimation>
        <div className="hard-skills">
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.10 * 1000}>
              <img src={python} alt="python" />
            </ScrollAnimation>
          </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.11 * 1000}>
              <img src={java} alt="java" />
            </ScrollAnimation>
          </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.12 * 1000}>
              <img src={jsIcon} alt="JavaScript" />
            </ScrollAnimation>
          </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.13 * 1000}>
              <img src={reactIcon} alt="React" />
            </ScrollAnimation>
          </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.14 * 1000}>
              <img src={typescriptIcon} alt="Typescript" />
            </ScrollAnimation>
          </div>
          <div className="hability">
                <ScrollAnimation animateIn="fadeInUp" delay={0.13 * 1000}>
                  <img src={sql} alt="SQL" />
                </ScrollAnimation>
              </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.16 * 1000}>
              <img src={nodeIcon} alt="Node.js" />
            </ScrollAnimation>
          </div>
          <div className="hability">
                <ScrollAnimation animateIn="fadeInUp" delay={0.20 * 1000}>
                  <img src={fastapi} alt="FastAPI" />
                </ScrollAnimation>
              </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.18 * 1000}>
              <img src={htmlIcon} alt="Html" />
            </ScrollAnimation>
          </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.19 * 1000}>
              <img src={cssIcon} alt="Css" />
            </ScrollAnimation>
          </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.20 * 1000}>
              <img src={powerbi} alt="power-bi" />
            </ScrollAnimation>
          
          </div>
        </div>
      </div>
      <div className="about-image">
        <ScrollAnimation animateIn="fadeInRight" delay={0.21 * 1000}>
          <img src={PushprajPandey} alt="Pushpraj Pandey" />
        </ScrollAnimation>
      </div>
    </Container>
  )
}
