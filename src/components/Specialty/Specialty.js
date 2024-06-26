import React from 'react';
import './Specialty.css';
import lemonade1 from '../../assets/lemonade1.jpg';
import lemonade2 from '../../assets/lemonade2.jpg';
import lemonade3 from '../../assets/lemonade3.jpg';
import lemonade4 from '../../assets/lemonade4.jpg';
import lemonade5 from '../../assets/lemonade5.jpg';
import lemonade6 from '../../assets/lemonade6.jpg';
import arrow from '../../assets/white-arrow.png'

const Specialty = () => {
  return (
    <div className='specialty'>
      <div className='delicacy'>
         <img src={lemonade6}/>
         <img src={lemonade2}/>
         <img src={lemonade3}/>
         <img src={lemonade5}/>
      </div>
      <button className='btn dark-btn'>See more here <img src={arrow}/></button>
    </div>
  )
}

export default Specialty
