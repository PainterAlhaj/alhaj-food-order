import React, { useContext } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { APIResponse } from './ContextData';
import {  Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { RiErrorWarningLine } from 'react-icons/ri';

const DialogBox = ({handleConfirmDelete}) => {
      const { ViewCart, setViewCart ,openDialog,setOpenDialog,itemToDelete,setItemToDelete,handleCloseDialog,DeleteAll, setDeleteAll} = useContext(APIResponse);
    
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} sx={{boxShadow:"none",borderRadius:'0',zIndex:'10000'}} >
      <div className="delete-popup">
      <div className="close-modal"
              
              onClick={() => setOpenDialog(false)}>
              <IoCloseSharp className="close-icon icon" />
            </div>
      <DialogTitle className='title'>
<RiErrorWarningLine className='icon'/>
      </DialogTitle>
      <DialogContent className='content'>
        <p>Are you sure you want to remove this item from the cart?</p>
      </DialogContent>
      <DialogActions>
      
        <Button onClick={handleConfirmDelete} variant='contained' className='btn' >
          Confirm
        </Button>
      </DialogActions>
      </div>
    </Dialog>
  )
}

export default DialogBox
