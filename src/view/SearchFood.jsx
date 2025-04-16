import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Backdrop from '@mui/material/Backdrop';
import { Button } from '@mui/material';


// react icons
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

// import css file
import '../assets/css/SearchFood.css'

import { APIResponse } from './ContextData';
import AddProduct from './AddProduct';


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function SearchFood() {
  const sectionsRef = React.useRef([]);
  const { APIData, SetAPIData, ModalOpen, SetModalOpen, ShowDetails, setActiveCategory } = React.useContext(APIResponse)
  const [Input, SetInput] = React.useState('')
  const [FilteredData, setFilteredData] = React.useState([]);
  const categoryRefs = React.useRef({})
  React.useEffect(() => {
    if (!APIData || !APIData.CategoryList) return;

    const delayDebounce = setTimeout(() => {
    const filtered = APIData.CategoryList.map((category) => {
      const isCategoryMatched = category.CategryName.toLowerCase().includes(Input.toLowerCase());

      const matchedItems = category.ItemListWidget.filter((item) =>
        item.ItemName.toLowerCase().includes(Input.toLowerCase())
      );

      if (isCategoryMatched || matchedItems.length > 0) {
        return {
          ...category,
          ItemListWidget: matchedItems
        };
      }

      return null;
    }).filter(Boolean);

    setFilteredData(filtered);
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounce);
  }, [Input, APIData.CategoryList]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const category = entry.target.getAttribute("id").replace("section-", "");
            setActiveCategory(category); // <- update your active category state
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    // Timeout to ensure DOM elements are mounted
    const timeout = setTimeout(() => {
      Object.values(categoryRefs.current).forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 300); // a bit longer to make sure the DOM is painted

    return () => {
      clearTimeout(timeout);
      Object.values(categoryRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);





  //   SetInput(e.target.value)

  // };

  if (!APIData || !APIData.CategoryList) {
    return <p>Loading Data</p>

  }

  return (
    <React.Fragment>
      <div className="search-main-container">
        <div className="search-food-container">
          <div className='search-container'>
            <div className="input-box">
              <input type="text" name="" id="" placeholder='Search for dishes' value={Input} onChange={(e) => { SetInput(e.target.value) }} />
              {Input.length !== 0 &&
                <IoCloseOutline onClick={(() => { SetInput('') })} />
              }
            </div>
            <div className="search-btn">
              <CiSearch className='search-icon' />
            </div>
          </div>
          <List className="list" sx={{ mb: 2, }} id='scroll-div'>  
            {Input.length === 0 ?
              APIData.CategoryList.map((item, index) => {
                return (
                  <React.Fragment key={index}>

                    <div
                      ref={(el) => (categoryRefs.current[item.CategryName] = el)}
                      className="category-list"
                      id={`section-${item.CategryName}`}
                    >

                      <ListItemButton sx={{
                        mb: "20px",
                        borderBottom: "1px dashed rgb(204, 204, 204)",
                        textTransform: 'capitalize',

                      }}>

                        <ListItemText primary={item.CategryName} secondary={`${item.ItemListWidget.length} items`}
                          primaryTypographyProps={{
                            style: {
                              fontSize: '20px',
                              fontWeight: 700,
                              fontFamily: 'Poppins,sans-serif'
                            },
                          }}
                          secondaryTypographyProps={{
                            style: {
                              fontSize: '12px',
                              fontWeight: 500,
                              fontFamily: 'Poppins,sans-serif'
                            }
                          }}
                        />

                      </ListItemButton>
                      {item.ItemListWidget.map((widget, index) => {
                        return (
                          <ListItemButton key={index} sx={{
                            textTransform: 'capitalize'
                          }}>

                            <ListItemText primary={widget.ItemName}
                              primaryTypographyProps={{
                                style: {
                                  fontWeight: 600,
                                  fontSize: '18px',
                                  fontFamily: 'Poppins,sans-serif',
                                  color: "#212529",

                                }
                              }}
                              secondary={
                                <>
                                  <Typography component={'div'}
                                    sx={{
                                      color: "#999",
                                      fontSize: "14px",
                                      fontWeight: '600'
                                    }}>
                                    {widget.Description}
                                  </Typography>
                                  {widget.Price !== null &&
                                    <Typography component={'div'} sx={{
                                      color: '#007fe0',
                                      fontWeight: 600,
                                      fontSize: '16px',
                                    }}>
                                      {`Rs.${widget.Price}`}
                                    </Typography>
                                  }
                                </>
                              }

                            />

                            {
                              (widget.ItemImage) ? (
                                <div className="food-img" style={{}}>
                                  <img
                                    src={`https://www.foodchow.com/FoodItemImages/${widget.ItemImage}`}
                                    alt={widget.ItemName}
                                    height={50}
                                    width={50}
                                  // onError={(e) => e.target.src = '/fallback.jpg'} // fallback image
                                  />
                                  <Button variant='outlined' className='add-btn btn-img'

                                    onClick={() => { ShowDetails(widget.ItemName) }}
                                  >Add</Button>
                                </div>
                              ) : (
                                <Button variant='outlined' sx={{ borderRadius: '20px' }}
                                  className='add-btn'
                                  onClick={() => { ShowDetails(widget.ItemName) }}

                                >Add</Button>

                              )
                            }

                          </ListItemButton>

                        )
                      })}
                    </div>
                    {/* {ModalOpen && <AddProduct/>} */}

                  </React.Fragment>
                )
              }) :
              FilteredData.length === 0 ? (
                <Typography sx={{ textAlign: 'center', color: '#999', mt: 3, fontSize: '18px' }}>
                  No results found.
                </Typography>
              )
                :
                FilteredData.map((item, index) => {
                  console.log("item", item)
                  return (
                    <React.Fragment key={index}>
                      <div className='category-list'>
                        <ListItemButton sx={{
                          mb: "20px",
                          borderBottom: "1px dashed rgb(204, 204, 204)",
                          textTransform: 'capitalize',

                        }}>

                          <ListItemText primary={item.CategryName} secondary={`${item.ItemListWidget.length} items`}
                            primaryTypographyProps={{
                              style: {
                                fontSize: '20px',
                                fontWeight: 700,
                                fontFamily: 'Poppins,sans-serif'
                              },
                            }}
                            secondaryTypographyProps={{
                              style: {
                                fontSize: '12px',
                                fontWeight: 500,
                                fontFamily: 'Poppins,sans-serif'
                              }
                            }}
                          />

                        </ListItemButton>
                        {item.ItemListWidget.map((widget, index) => {
                          return (
                            <ListItemButton key={index} sx={{
                              textTransform: 'capitalize'
                            }}>

                              <ListItemText primary={widget.ItemName}
                                primaryTypographyProps={{
                                  style: {
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    fontFamily: 'Poppins,sans-serif',
                                    color: "#212529",

                                  }
                                }}
                                secondary={
                                  <>
                                    <Typography component={'div'}
                                      sx={{
                                        color: "#999",
                                        fontSize: "14px",
                                        fontWeight: '600'
                                      }}>
                                      {widget.Description}
                                    </Typography>
                                    {widget.Price !== null &&
                                      <Typography component={'div'} sx={{
                                        color: '#007fe0',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                      }}>
                                        {`Rs.${widget.Price}`}
                                      </Typography>
                                    }
                                  </>
                                }

                              />

                              {
                                (widget.ItemImage) ? (
                                  <div className="food-img" style={{}}>
                                    <img src={`https://www.foodchow.com/FoodItemImages/${widget.ItemImage}`} alt="" height={50} width={50} />
                                    <Button variant='outlined' sx={{ borderRadius: '20px' }}
                                      onClick={() => { ShowDetails(widget.ItemName) }}
                                    >Add</Button>
                                  </div>
                                ) : (
                                  <Button variant='outlined' sx={{ borderRadius: '20px' }}
                                    onClick={() => { ShowDetails(widget.ItemName) }}

                                  >Add</Button>

                                )
                              }

                            </ListItemButton>

                          )
                        })}
                      </div>


                    </React.Fragment>
                  )

                })
            }


          </List>



        </div>
      </div>
    </React.Fragment>
  );
}
