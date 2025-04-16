import { Button, Drawer } from '@mui/material'
import React, { useContext } from 'react'
import { IoCall, IoLocationOutline } from 'react-icons/io5'
import '../assets/css/SideBar.css'
import { BiMenu } from 'react-icons/bi'
import logo from '../assets/img/image/logo.jpg'
import { APIResponse } from '../view/ContextData'

const SideBar = () => {
      const { SideBarOpen, setSideBarOpen } = useContext(APIResponse);
    
  return (
  
  <div className="drawer-container">

<div className="menu-icon">
    <div className="icon">
<BiMenu 
onClick={()=>{setSideBarOpen(false)}}
style={{fontSize:"25px"}}/>
    </div>
    <a href='#' className="logo">
                  <img src={logo}alt=""  />
                </a>
</div>

    <div className="left">
    <div className="title">
                <h3>FoodChow Demo India</h3>
                <p>
                  <span>
                    <IoLocationOutline/>
                  </span>
                  Valsad,Gujarat,India
                </p>
                </div>
                </div>
                <div className='middle'>
            <p style={{color:'green'}}>Restaurant is Open</p>
            <p style={{fontWeight:'bold'}}>Timing 07:00 am - 11:00 pm </p>
          </div>
          <div className='right'>
            <Button variant='outlined' className='btn'>Choose Service</Button>
            <Button variant='outlined' className='btn'>Book Now</Button>
<Button className="btn contact" variant='outlined'>
  <a href="#">
    <IoCall style={{background:'blue',borderRadius:'50%',padding:'5',color:"white"}}/>
      
    1234567890
  </a>
</Button>
          </div>
  </div>
  )
}

export default SideBar
