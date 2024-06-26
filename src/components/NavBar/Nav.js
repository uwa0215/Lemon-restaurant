import React, { useEffect, useState } from 'react'
import './Nav.css'
import logo from '../../assets/logo1.png'
const Nav = () => {

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -260;
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };
 

  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    })
  },[]);


  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
      <img src={logo} alt="logo" className='logo'/>
      <ul>
        <li onClick={() => handleScroll('hero')}>Home</li>
        <li onClick={() => handleScroll('about')}>About</li>
        <li onClick={() => handleScroll('specialty')}>Menu</li>
        <li onClick={() => handleScroll('testimonial')}>Testimonials</li>
        <li onClick={() => handleScroll('section1')}>Order Online</li>
        <li onClick={() => handleScroll('contact')}><button className='btn'>Contact Us</button></li>
      </ul>
    </nav>
  )
}

export default Nav
