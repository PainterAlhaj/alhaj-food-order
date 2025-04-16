import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Backdrop } from '@mui/material';
import { AiOutlineMinus } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import '../assets/css/AddProduct.css';
import { APIResponse } from './ContextData';

const AddProduct = () => {
  const {
    ModalOpen,
    SetModalOpen,
    SelectedItem,
    cartItems,
    setCartItems,
  } = useContext(APIResponse);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPreferences, setSelectedPreferences] = useState({});
  const [quantity, setQuantity] = useState("1");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerHeight <= 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (SelectedItem?.SizeListWidget?.length > 0) {
      setSelectedSize(SelectedItem.SizeListWidget[0]);
    } else {
      setSelectedSize(null);
    }
    setSelectedPreferences({});
    setQuantity("1");
  }, [SelectedItem]);

  const handleBlur = () => {
    const value = parseInt(quantity, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value.toString());
    } else {
      setQuantity("1");
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => (parseInt(prev || "1", 10) + 1).toString());
  };

  const handleDecrement = () => {
    setQuantity(prev => {
      const newVal = Math.max(1, parseInt(prev || "1", 10) - 1);
      return newVal.toString();
    });
  };

  const calculateTotal = () => {
    const price = selectedSize?.Price || SelectedItem?.Price || 0;
    return price * parseInt(quantity || "1", 10);
  };

  const handleAddToCart = () => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return;

    const itemToAdd = {
      name: SelectedItem.ItemName,
      size: selectedSize?.SizeName || null,
      price: (selectedSize?.Price || SelectedItem.Price || 0) * qty,
      preferences: selectedPreferences,
      quantity: qty
    };

    const existingIndex = cartItems.findIndex(item =>
      item.name === itemToAdd.name &&
      item.size === itemToAdd.size &&
      JSON.stringify(item.preferences) === JSON.stringify(itemToAdd.preferences)
    );

    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += qty;
      updatedItems[existingIndex].price += (selectedSize?.Price || SelectedItem.Price || 0) * qty;
      setCartItems(updatedItems);
    } else {
      setCartItems(prev => [...prev, itemToAdd]);
    }

    SetModalOpen(false);
  };

  return (
    <Modal
      open={ModalOpen}
      onClose={() => SetModalOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <div
        className="addproduct-container"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          backgroundColor: 'white',
          boxShadow: 24,
          padding: '16px',
          zIndex: 1000,
          outline: 'none',
        }}
      >
        <div className="addproduct-details">
          <div className="item-info">
            <div className="item-data">
              <h3>{SelectedItem?.ItemName}</h3>
              <p>
                {SelectedItem.Description
                  ? SelectedItem.Description
                  : SelectedItem.Price
                  ? `Rs.${SelectedItem.Price}`
                  : null}
              </p>
            </div>
            <div className="close-modal" onClick={() => SetModalOpen(false)}>
              <IoCloseOutline className="close-icon icon" />
            </div>
          </div>

          <div
            className="scroll-div"
            style={{
              height:
                SelectedItem.ItemImage ||
                SelectedItem.SizeListWidget?.length > 0 ||
                SelectedItem.FooditemprefrencewidgetList?.length > 0
                  ? isMobile
                    ? '300px'
                    : '400px'
                  : 'unset',
            }}
          >
            {SelectedItem.ItemImage && (
              <div className="item-img">
                <img
                  src={`https://www.foodchow.com/FoodItemImages/${SelectedItem.ItemImage}`}
                  alt="Item"
                />
              </div>
            )}

            {SelectedItem.SizeListWidget?.length > 0 && (
              <div className="item-features">
                <h3>Variants</h3>
                {SelectedItem.SizeListWidget.map((size, i) => (
                  <div key={i} className="options-list">
                    <div className="options">
                      <input
                        type="radio"
                        name="size"
                        id={`size-${i}`}
                        checked={selectedSize?.SizeName === size.SizeName}
                        onChange={() => setSelectedSize(size)}
                      />
                      <label htmlFor={`size-${i}`}>{size.SizeName}</label>
                    </div>
                    <p>Rs.{size.Price}</p>
                  </div>
                ))}
              </div>
            )}

            {SelectedItem.FooditemprefrencewidgetList?.length > 0 &&
              SelectedItem.FooditemprefrencewidgetList.map((pref, i) => (
                <div key={i} className="item-features">
                  <h3>{pref.Name}</h3>
                  {pref.PrefOptionList.map((option, j) => (
                    <div key={j} className="checkbox-list">
                      <input
                        type={pref.max_selection > 1 ? 'checkbox' : 'radio'}
                        name={`pref-${i}`}
                        id={`option-${i}-${j}`}
                        value={option.Name}
                        checked={
                          pref.max_selection > 1
                            ? selectedPreferences[pref.Name]?.includes(option.Name)
                            : selectedPreferences[pref.Name] === option.Name
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedPreferences((prev) => {
                            if (pref.max_selection > 1) {
                              const prevValues = prev[pref.Name] || [];
                              if (e.target.checked) {
                                return {
                                  ...prev,
                                  [pref.Name]: [...prevValues, value],
                                };
                              } else {
                                return {
                                  ...prev,
                                  [pref.Name]: prevValues.filter((v) => v !== value),
                                };
                              }
                            } else {
                              return {
                                ...prev,
                                [pref.Name]: value,
                              };
                            }
                          });
                        }}
                      />
                      <label htmlFor={`option-${i}-${j}`}>{option.Name}</label>
                    </div>
                  ))}
                </div>
              ))}

            <div className="special-info">
              <h5>Special Instructions</h5>
              <textarea
                rows={3}
                placeholder="Any suggestions for us? We will keep it in mind."
              />
            </div>

            <div className="quantity">
              <h5>Enter QTY:</h5>
              <div className="inc-dec">
                <div className="icons" onClick={handleDecrement}>
                  <AiOutlineMinus className="icon" />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) setQuantity(val);
                    }}
                    onBlur={handleBlur}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
                <div className="icons" onClick={handleIncrement}>
                  <IoIosAdd className="icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="total-amount">
            <div>
              <h5>Total: Rs.{calculateTotal()}</h5>
              <Button variant="contained" className="btn" onClick={handleAddToCart}>
                Add Item
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
