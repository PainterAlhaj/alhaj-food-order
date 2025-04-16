import React, { createContext, useEffect, useState } from 'react'
export const APIResponse = createContext()

const ContextData = ({ children }) => {
  const [APIData, SetAPIData] = useState([])
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [ModalOpen, SetModalOpen] = useState(false)
  const [AddingProduct, SetAddingProduct] = useState(null)
  const [SelectedItem, SetSelectedItem] = useState(null);
  const [SideBarOpen, setSideBarOpen] = useState(false)
  const [OpenMenu, setOpenMenu] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0);
  const [ViewCart, setViewCart] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  
    const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null) 

  
  const ShowDetails = (productName) => {
    // Find the item once and store it
    const allItems = APIData?.CategoryList?.flatMap(item => item.ItemListWidget) || [];
    const item = allItems.find(i => i.ItemName === productName);

    if (item) {
      SetSelectedItem(item);
      SetModalOpen(true);
    }
  };
  useEffect(() => {
    if (APIData?.CategoryList?.length) {
      setActiveCategory(APIData.CategoryList[0].CategryName);
    }
  }, [APIData]);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const cartValue = { totalAmount, setTotalAmount, ViewCart, setViewCart }
  const propsData = { SideBarOpen, setSideBarOpen }
  const MobileMenu = { OpenMenu, setOpenMenu }
  const ScrollMotion = { activeCategory, setActiveCategory }


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const Dialogstate={openDialog,setOpenDialog,itemToDelete,setItemToDelete,handleCloseDialog}


  const SendData = {
    APIData, SetAPIData,
    ModalOpen, SetModalOpen,
    ShowDetails,
    AddingProduct,
    SetAddingProduct,
    SelectedItem,
    ...cartValue,
    cartItems, setCartItems,
    ...propsData,
    ...MobileMenu,
    ...ScrollMotion,
    ...Dialogstate
  }

  return (
    <>
      <APIResponse.Provider value={SendData}>
        {children}
      </APIResponse.Provider>
    </>
  )
}

export default ContextData
