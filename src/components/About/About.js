import React from 'react'
import './About.css'
import about_img from '../../assets/About.jpg'
import play_icon from '../../assets/play-icon.png'
const About = ({setPlayState}) => {
  return (
    <div className='about' id='about'>
      <div className='about-left'>
       <img src={about_img} className='about-img' />
       <img src={play_icon} className='play-icon' onClick={()=>{setPlayState(true)}}/>
      </div>
      
      <div className='about-right'>
        <h3>ABOUT LITTLE LEMON</h3>
        <h2>Indulge in Refreshing Sips and Decadent Bites at Little Lemon</h2>
        <p>Welcome to our restaurant, where we
           specialize in creating refreshing lemon juice,
            delectable cakes, and vibrant salads. Located 
            in the heart of the Philippines, our menu highlights
             the zest and versatility of lemons, offering a unique 
             culinary experience.</p>
        <p>Each dish is prepared with fresh, high-quality ingredients,
           ensuring every bite is a burst of flavor. Whether you're 
           in the mood for a tangy drink, a sweet treat, or a wholesome
            salad, we have something to satisfy your cravings.
             Join us for a delightful meal that celebrates the bright,
              sunny essence of lemons, right here in the Philippines.</p>
      </div>
    </div>
  )
}

export default About
