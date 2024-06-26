import React, { useEffect, useState } from 'react'
import './Nav.css'
import logo from '../../assets/logo1.png'
const Nav = () => {

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
        <li>Home</li>
        <li>About</li>
        <li>Menu</li>
        <li>Reservation</li>
        <li>Order Online</li>
        <li><button className='btn'>Login</button></li>
      </ul>
    </nav>
  )
}

export default Nav
