import React from 'react'
import Nav from './components/NavBar/Nav'
import Hero from './components/Hero/Hero'
import Menu from './components/Menu/Menu'
import Title from './components/Title/Title'
import About from './components/About/About'
import Specialty from './components/Specialty/Specialty'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
const App = () => {
  return (
    <div>
      <Nav/>
      <Hero/>
      <div className='container'>
        <Title subTitle='Our MENU' title='What We Offer'/>
        <Menu/>
        <About/>
        <Title subTitle='Menu' title='Specialties'/>
        <Specialty/>
        <Title subTitle='TESTIMONIALS' title='What Customer Says'/>
        <Testimonials/>
        <Title subTitle='Contact us' title='Get in Touch'/>
        <Contact/>
        <Footer/>

      </div>
      
    </div>
  )
}

export default App
