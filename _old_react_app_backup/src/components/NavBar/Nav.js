import React, { useEffect, useState } from 'react'
import './Nav.css'
import logo from '../../assets/logo1.png'
import menu_icon from '../../assets/menu-icon.png'

const Nav = ({setBookState}) => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = id === 'about' ? -180 : -260;
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt="logo" className='logo'/>
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
        <li onClick={() => handleScroll('hero')}>Home</li>
        <li onClick={() => handleScroll('about')}>About</li>
        <li onClick={() => handleScroll('specialty')}>Menu</li>
        <li onClick={() => handleScroll('testimonial')}>Testimonials</li>
        <li onClick={()=>{setBookState(true)}} >Book Online</li>
        <li onClick={() => handleScroll('contact')}><button className='btn'>Contact Us</button></li>
      </ul>
      <img src={menu_icon} alt="menu" className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Nav
