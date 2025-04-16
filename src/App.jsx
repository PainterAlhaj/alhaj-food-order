import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Categories from './view/Categories'
import SearchFood from './view/SearchFood'
import Cart from './view/Cart'
import FoodData from './api/FoodData'
import FoodStore from './view/FoodStore'
import AddProduct from './view/AddProduct'
import { APIResponse } from './view/ContextData'
import FoodTime from './view/FoodTime'
import MobileCategories from './view/mobile-devices/MobileCategories'
import CategoryMenu from './view/mobile-devices/CategoryMenu'
import SmallCart from './view/mobile-devices/SmallCart'
import MobileCart from './view/mobile-devices/MobileCart'
import MyLoader from './view/MyLOader'

function App() {
      const {APIData,ModalOpen,SetModalOpen,ViewCart}= useContext(APIResponse)

  return (
  <>
  <Navbar/>
  <FoodTime/>
 {ModalOpen && <AddProduct/>}  
  <FoodData/>
  <FoodStore/>
  <SmallCart/>
  {ViewCart && <MobileCart/> } 
<MyLoader/>
  </>
  )
}

export default App
