import React, { useRef } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/right-arrow.png'
import back_icon from '../../assets/left-arrow.png'
import user1 from '../../assets/user1.jpg'
import user2 from '../../assets/user2.jpg'
import user3 from '../../assets/user3.jpg'
import user4 from '../../assets/user4.jpg'


const Testimonials = () => {

        const slider = useRef();
        let tx = 0;


    const slideForward = ()=>{
        if(tx > -50){
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    }
    const slideBackward = ()=>{
        if(tx < 0){
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    }

  return (
    <div className='testimonials'>
      <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>
      <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
      <div className="slider">
        <ul ref={slider}>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user1} alt="" />
                        <div>
                            <h3>Mary Padilla</h3>
                            <span>Manila, Philippines</span>
                        </div>
                    </div>
                    <p>
                    "Delightful citrus cakes and salads!"
                    </p>
                </div>
            </li>

            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user2} alt="" />
                        <div>
                            <h3>Josh Curtiz</h3>
                            <span>Batangas, Philippines</span>
                        </div>
                    </div>
                    <p>
                    "Zesty lemon treats and salads!"
                    </p>
                </div>
            </li>

            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user3} alt="" />
                        <div>
                            <h3>Mark Cortez</h3>
                            <span>Marikina, Philippines</span>
                        </div>
                    </div>
                    <p>
                    "Fresh lemon flavors and salads!"
                    </p>
                </div>
            </li>

            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user4} alt="" />
                        <div>
                            <h3>Grace Bernardo</h3>
                            <span>Pasay, Philippines</span>
                        </div>
                    </div>
                    <p>
                    "Refreshing lemon juice and desserts!"
                    </p>
                </div>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Testimonials
