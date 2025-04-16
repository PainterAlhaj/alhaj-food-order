import { Button } from '@mui/material'
import React from 'react'
import '../assets/css/FoodTime.css'
const FoodTime = () => {
  return (
   <div className="menu-container">
    <div className="menu-details">
            <Button variant='contained' className='btn active'>BreakFast</Button>
            <Button variant='outlined' className='btn'>Main Menu</Button>

            <Button variant='outlined' className='btn'>DinnerMenu</Button>
    </div>
   </div>
  )
}

export default FoodTime
