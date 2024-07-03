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
                <select name="time" id="time">
                   <option>17:00</option>
                   <option>18:00</option>
                   <option>19:00</option>
                   <option>20:00</option>
                   <option>21:00</option>
                   <option>22:00</option>
                </select>
                <label>Number Of Guests</label>
                <input type="number" name='guests' placeholder='1' min='1' max='20'/>
                <button type='submit' className='btn dark-btn'>Submit Now</button>
      </form>
    </div>
  )
}

export default Form
