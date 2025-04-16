import { AppBar, Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import '../../assets/css/SmallCart.css';
import { APIResponse } from '../ContextData';

const SmallCart = () => {
  const { totalAmount, cartItems,ViewCart,setViewCart } = useContext(APIResponse); 

  useEffect(() => {
    if (totalAmount) {
      console.log('Total Amount:', totalAmount);
    }
  }, [totalAmount]);

  // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Calculate total items
  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
const totalAmounts = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);


  return (
  <div className='small-cart' style={{background:'black'}}>  
    <AppBar   position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <div className="small-cart-container">
        <div className="small-cart-details">
          <p>{totalItems} item{totalItems !== 1 ? 's' : ''} | <span>Rs.{totalAmounts.toFixed(2)}</span></p>
          <Button className="btn" variant="contained" onClick={()=>setViewCart(!ViewCart)}>View Cart</Button>
        </div>
      </div>
    </AppBar>
    </div>
  );
};

export default SmallCart;
