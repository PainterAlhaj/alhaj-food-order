import React from 'react'
import Categories from './Categories'
import SearchFood from './SearchFood'
import Navbar from '../components/Navbar'
import '../assets/css/FoodStore.css'
import Cart from './Cart'
import MobileCategories from './mobile-devices/MobileCategories'
import CategoryMenu from './mobile-devices/CategoryMenu'
import SmallCart from './mobile-devices/SmallCart'
import MobileCart from './mobile-devices/MobileCart'
const FoodStore = () => {
  return (
    <>
      <div className="food-store-container">

        <div className="food-store-data">
          <div className='category'>
            <Categories />
            <div className="show-in-mobile">

              <CategoryMenu />
            </div>
          </div>
          <div className='searchfood'><SearchFood /></div>
          <div className='cart'>
            <Cart />
            <div className="show-in-mobilse">
              <SmallCart />
              <MobileCart />
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default FoodStore
