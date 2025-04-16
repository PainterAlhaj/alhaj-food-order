import React, { useContext } from 'react'
import { AppBar, Box, Fab, IconButton, styled, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

// Import CSS Files
import '../../assets/css/CategoryMenu.css'
import { APIResponse } from '../ContextData';
import MobileCategories from './MobileCategories';
const CategoryMenu = () => {
  const {OpenMenu,setOpenMenu}=useContext(APIResponse)
    

  return (
    <>
    <MobileCategories/>
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: '70px' ,background:"none",boxShadow:"none",overflow:'auto'}}>
    <Toolbar>
    
      
      <div className='category-menu' onClick={()=>setOpenMenu(!OpenMenu)}>
      <MenuIcon />
      <p>Menu</p>
      </div>
    
    </Toolbar>
  </AppBar>
  </>
  )
}

export default CategoryMenu
