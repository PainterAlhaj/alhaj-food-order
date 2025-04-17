import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { AiFillDelete } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';
import { LuMinus } from 'react-icons/lu';
import { APIResponse } from './ContextData';
import '../assets/css/Cart.css';
import EmptyCartImg from '../assets/img/image/empty-cart-img.png';
import { IoCloseOutline } from 'react-icons/io5';
import DialogBox from './DialogBox';

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    setTotalAmount,
    ViewCart,
    setViewCart,
    openDialog,
    setOpenDialog,
    itemToDelete,
    setItemToDelete,
    handleCloseDialog,
    DeleteAll, 
    setDeleteAll,
  } = React.useContext(APIResponse);


  const handleOpenDialog = (index) => {
    setItemToDelete(index);
    setDeleteAll(false);
    setOpenDialog(true);
  };

  const DeleteAllCart = () => {
    setDeleteAll(true);
    setOpenDialog(true);

  };

  const handleClearCart = () => {

    setCartItems([]);
    setOpenDialog(false);
    setDeleteAll(false);
  };

  const handleConfirmDelete = () => {
    if (DeleteAll) {
    console.log("delete allcart")

      handleClearCart();
    } else {
      const updated = [...cartItems];
      updated.splice(itemToDelete, 1);
      setCartItems(updated);
      setOpenDialog(false);
      setItemToDelete(null);
    }
  };

  const handleIncrement = (index) => {
    const updated = [...cartItems];
    updated[index].quantity = Number(updated[index].quantity) + 1;
  
    if (updated[index].originalPrice) {
      updated[index].price = Number(updated[index].originalPrice) * updated[index].quantity;
    }
  
    setCartItems(updated);
  };
  
  const handleDecrement = (index) => {
    const updated = [...cartItems];
    if (Number(updated[index].quantity) > 1) {
      updated[index].quantity = Number(updated[index].quantity) - 1;
  
      if (updated[index].originalPrice) {
        updated[index].price = Number(updated[index].originalPrice) * updated[index].quantity;
      }
  
      setCartItems(updated);
    } else {
      handleOpenDialog(index); // Confirm before removing
    }
  };
  ;

  const itemTotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) ,
    0
  );
  const otherCharges = 0;
  const total = itemTotal + otherCharges;

  React.useEffect(() => {
    const newItemTotal = cartItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );
    const newTotal = newItemTotal + otherCharges;
    setTotalAmount(newTotal);
  }, [cartItems]);

  return (
    <>
      <div className="cart-container" style={{ padding: `${ViewCart ? '0' : '20px'}` }}>
        <div
          className={`cart-details ${ViewCart?'':'extra-height'}`}
          style={{
            height: `${ViewCart ? '100vh' : '380px'}`,

            border: `${ViewCart ? 'none' : '1px solid rgb(202, 202, 202)'}`
          }}
        >
          <div className="heading">
            <h3>Your Cart</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {cartItems.length > 0 && (
                <Button variant="outlined" className="btn" onClick={DeleteAllCart}>
                  <div className="icon delete">
                    <AiFillDelete />
                  </div>
                  Clear Cart
                </Button>
              )}
              {ViewCart && (
                <div className="close-modal" onClick={() => setViewCart(false)}>
                  <IoCloseOutline className="close-icon icon" />
                </div>
              )}
            </div>
          </div>

          {cartItems.length > 0 ? (
            <div className="cart-available">
              <List
                className={`List ${ViewCart?'':'extra-height-list'}`}
                
                sx={{
                  position: 'relative',
                  overflow: 'auto',
                  height: `${ViewCart ? 'calc(100vh - 200px)' : '110px'}`,
                  maxHeight:'auto',

                
                  '& ul': { paddingBottom: `${ViewCart ? '60px' : '0'}` }
                }}
                subheader={<li />}
              >
                {cartItems.map((item, index) => (
                  <li key={index}>
                    <ul>
                      <ListItem
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'unset'
                        }}
                      >
                        <ListItemText
                          primary={item.name}
                          secondary={`Rs. ${Number(item.price)}`}

                          primaryTypographyProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
                          secondaryTypographyProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
                          sx={{
                            textTransform: 'capitalize',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        />

                        {item.size && (
                          <div className="cart-extra">
                            <p>
                              {item.size}
                              <span>{` (Rs.${item.price})`}</span>
                            </p>
                          </div>
                        )}

                        {item.preferences && Object.keys(item.preferences).length > 0 && (
                          <div className="cart-extra">
                            {Object.entries(item.preferences).map(([prefName, value]) => (
                              <p key={prefName}>
                                <strong>{prefName}:</strong>{' '}
                                {Array.isArray(value) ? value.join(', ') : value}
                              </p>
                            ))}
                          </div>
                        )}

                        <div className="list-actions">
                          <div className="icon delete" onClick={() => handleOpenDialog(index)}>
                            <AiFillDelete />
                          </div>
                          <div className="action">
                            <div className="inc-dec">
                              <LuMinus className="icon increment" onClick={() => handleDecrement(index)} />
                              {Number(item.quantity)}
                              <IoIosAdd className="icon decrement" onClick={() => handleIncrement(index)} />
                            </div>
                          </div>
                        </div>
                      </ListItem>
                    </ul>
                  </li>
                ))}
              </List>

              <div className="price-info">
                <div className="total-price">
                  <div className="total-item">
                    <p>
                      Item Total : <span>Rs.{itemTotal.toFixed(2)}</span>
                    </p>
                  </div>
                  <div className="other">
                    <p>
                      Other : <span>Rs.{otherCharges.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <div className="total">
                  <p>
                    Total : <span>Rs.{total.toFixed(2)}</span>
                  </p>
                </div>
                <div className="checkout-btn">
                  <Button variant="contained" className="btn checkout">
                    Proceed to checkout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <div className="img">
                <img src={EmptyCartImg} alt="Empty Cart" />
              </div>
              <div className="empty-text">
                <p>Your cart is empty! Add some delicious food items and satisfy your cravings. 🍽️😋</p>
              </div>
              {ViewCart && (
                <Button variant="outlined" className="btn" onClick={() => setViewCart(false)}>
                  Browse Menu
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {openDialog && <DialogBox handleConfirmDelete={handleConfirmDelete} />}
    </>
  );
}
