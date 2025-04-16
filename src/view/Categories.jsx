import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { APIResponse } from './ContextData';
import '../assets/css/Categories.css';
import MyLoader from './MyLOader';

export default function Categories() {
  const { APIData, activeCategory, setActiveCategory } = React.useContext(APIResponse);

  // const handleCategoryClick = (categoryName) => {
  //   setActiveCategory(categoryName);
  //   const categoryElement = document.getElementById(`section-${categoryName}`);
  //   if (categoryElement) {
  //     categoryElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };


  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    const categoryElement = document.getElementById(`section-${categoryName}`);
    const scrollContainer = document.getElementById('scroll-div'); // Change this ID
  
    if (categoryElement && scrollContainer) {
      const offsetTop = categoryElement.offsetTop;
      scrollContainer.scrollTo({
        top: offsetTop - 10,
        behavior: 'smooth',
      });
    }
  };
  

  if (!APIData || !APIData.CategoryList) {
    return <MyLoader/>
  }

  return (
    <div className="category-container">
      <div className="category-details">
        <div className="heading">
          <h3>CATEGORIES</h3>
        </div>
        <List
          className="List"
          sx={{
            position: 'relative',
            overflow: 'auto',
            height: '100%',
            maxHeight: 'unset',
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {APIData.CategoryList.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handleCategoryClick(item.CategryName)}
              sx={{
                backgroundColor: activeCategory?.trim().toLowerCase() === item.CategryName.trim().toLowerCase()
                  ? '#007fe0'
                  : 'transparent',
                color: activeCategory === item.CategryName ? 'white' : 'black',
                cursor: 'pointer',
              }}
            >
              <ListItemText
                primary={item.CategryName}
                primaryTypographyProps={{
                  style: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    color: activeCategory === item.CategryName ? 'white' : 'black',
                  },
                }}
                className="category-name"
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
