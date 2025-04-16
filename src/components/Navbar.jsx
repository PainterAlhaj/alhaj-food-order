import React, { useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Drawer } from '@mui/material';
import logo from '../assets/img/image/logo.jpg'
import { IoLocationOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import '../assets/css/Navbar.css'
import { BiMenu } from 'react-icons/bi';
import SideBar from './SideBar';
import { APIResponse } from '../view/ContextData';
const Navbar = () => {
  const { SideBarOpen, setSideBarOpen } = useContext(APIResponse);

  return (
    <>
    <AppBar className='appbar' position='relative' sx={{background:'white',color:'black'}}>
        <Toolbar className='toolbar'>
          <div className="menu-icon">
            <BiMenu onClick={()=>setSideBarOpen(!SideBarOpen)}/>
          </div>
          <div className='left'>
            <a href='#' className="logo">
              <img src={logo}alt=""  />
            </a>
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

        </Toolbar>
    </AppBar>
    <Drawer
    anchor={'top'}
    open={SideBarOpen}
    onClose={() => setSideBarOpen(false)}

  >
    <SideBar/>

    </Drawer>
    </>
  )
}

export default Navbar
