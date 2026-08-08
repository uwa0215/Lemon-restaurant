import React from 'react'
import './Menu.css'
import menu_1 from '../../assets/menu1.jfif'
import menu_2 from '../../assets/menu2.jpg'
import menu_3 from '../../assets/menu3.jpg'
import menu_icon_1 from '../../assets/icon1.png'
import menu_icon_2 from '../../assets/icon2.png'
import menu_icon_3 from '../../assets/icon3.png'

const Menu = () => {
  return (
    <div className='menus'>
      <div className='menu'>
        <img src={menu_1}/>
        <div className='caption'>
            <img src={menu_icon_1}/>
            <p>Beverages</p>
        </div>
      </div>

      <div className='menu'>
        <img src={menu_2}/>
        <div className='caption'>
            <img src={menu_icon_2}/>
            <p>Pastry</p>
        </div>
      </div>

      <div className='menu'>
        <img src={menu_3}/>
        <div className='caption'>
            <img src={menu_icon_3}/>
            <p>Appetizers</p>
        </div>
      </div>
    </div>
  )
}

export default Menu
