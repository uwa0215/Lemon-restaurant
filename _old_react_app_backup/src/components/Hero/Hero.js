import React from 'react';
import './Hero.css';
import cart from '../../assets/cart.png';
import lemon from '../../assets/lemon.jfif';

const Hero = ({setBookState}) => {
  
 

  return (
    <div className='hero container' id='hero'>
      <div className='hero-text'>
        <h1>Little Lemon</h1>
        <h2>Philippines</h2>
        <p>Quench your thirst with our refreshing, all-natural lemon juice!</p>
        <p>
          Made from the freshest lemons, our drinks are the perfect blend of tangy and sweet—guaranteed to brighten your day
        </p>
        <button className='btn' onClick={()=>{setBookState(true)}} >
          Book Now <img src={cart} alt="cart" />
        </button>
      </div>
      <div className='headline-img'>
        <img src={lemon} alt="lemon" />
      </div>
    </div>
  );
};

export default Hero;
