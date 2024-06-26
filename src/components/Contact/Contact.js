import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg2.png'
import mail_icon from '../../assets/mail.png'
import phone_icon from '../../assets/phone.png'
import location_icon from '../../assets/location.png'
import white_arrow from '../../assets/white-arrow.png'

const Contact = () => {

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "723c194d-b6b6-44f1-92ba-6d03cf09d12f");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };

  return (
    <div className='contact'>
        <div className="contact-col">
            <h3>Send us a message <img src={msg_icon} alt="" /></h3>
            <p>
            We'd love to hear from you! Whether you have a question, 
            want to make a reservation, or simply want to learn more 
            about what makes Little Lemon special, we're here to help.
             Fill out the form below, give us a call, or drop by in person.
            </p>
            <ul>
                <li><img src={mail_icon} alt="" />littlelemon@gmail.com</li>
                <li><img src={phone_icon} alt="" />+63 975 236 3469</li>
                <li><img src={location_icon} alt="" />Maharlika Highway, City of Santo Tomas, Batangas</li> 
            </ul>
        </div>
        <div className="contact-col">
            <form onSubmit={onSubmit}>
                <label>Your Name</label>
                <input type="text" name='name' placeholder='Enter your name' required />
                <label>Phone Number</label>
                <input type="tel" name='phone' placeholder='Enter your mobile number' required/>
                <label>Write your message here</label>
                <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>
                <button type='submit' className='btn dark-btn'>Submit Now <img src={white_arrow} alt="" /></button>
            </form>
            <span>{result}</span>
        </div>
    </div>
  )
}

export default Contact
