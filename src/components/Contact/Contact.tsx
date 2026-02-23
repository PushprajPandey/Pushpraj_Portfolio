import { Container } from "./styles";
import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg"
import { Form } from "../Form/Form";


export function Contact(){

  return(
    <Container id="contact">
      <header>
        <h2>Contact</h2>
        <p>Ready to get started on your project? </p>
        <p>Contact me now for a Free consultation.</p>
      </header>
      <div className="contacts">
        <div>
        <a href="mailto:sajalpandey858@gmail.com"><img src={emailIcon} alt="Email" /></a> 
          <a href="mailto:sajalpandey858@gmail.com">sajalpandey858@gmail.com</a>
        </div>
        <div>
        <a href="tel:+917489690930"><img src={phoneIcon} alt="Phone No" /></a>
          <a href="tel:+917489690930">(+91) 7489690930</a>
        </div>  
      </div>
      <Form></Form>
    </Container>
  )
}