import React, { useContext, useEffect } from 'react'
import Cart from '../Cart'
import '../../assets/css/MobileCart.css'
import { APIResponse } from '../ContextData';

const MobileCart = () => {
      const { ViewCart } = useContext(APIResponse); 
 
    
  return (
   <> 
    <div className='mobile-cart'style={{display:`${ViewCart?'block':'none'}`}}>
      <Cart/>
    </div>
  
    </>
  )
}

export default MobileCart
