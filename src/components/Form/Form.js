import React, { useRef } from 'react'
import './Form.css'

const Form = ({bookState, setBookState}) => {

    const booking = useRef(null);
    const closeBooking = (e)=>{
        if(e.target === booking.current){
            setBookState(false)
        }
    }

    

  return (
    <div className={`booking-form ${bookState?'':'hide'}`} ref={booking}>
        
      <form>
        <h3>Book Your Table</h3>
        <button className='btn-close' onClick={closeBooking}>&times;</button>
                <label>Full Name</label>
                <input type="text" name='name' placeholder='Enter your name'/>
                <label>Choose Date</label>
                <input type="date" name='date' />
                <label>Choose Time</label>
                <input type="time" name='date' />
                <label>Number Of Guests</label>
                <input type="number" name='guests' />
                <button type='submit' className='btn dark-btn'>Submit Now</button>
      </form>
    </div>
  )
}

export default Form
