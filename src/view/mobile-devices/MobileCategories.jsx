import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../../assets/css/Categories.css';
import { APIResponse } from '../ContextData';

export default function MobileCategories() {
  const {
    APIData,
    OpenMenu,
    setOpenMenu,
    activeCategory,
    setActiveCategory,
  } = React.useContext(APIResponse);
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    const handleScroll = () => {
      setOpenMenu(false);
    };

    if (OpenMenu) {
      // close on any document scroll
      window.addEventListener('scroll', handleScroll, { passive: true });

      // also close on scroll inside your scroll-div
      const scrollContainer = document.getElementById('scroll-div');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      }

      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const scrollContainer = document.getElementById('scroll-div');
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [OpenMenu, setOpenMenu]);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    const categoryElement = document.getElementById(`section-${categoryName}`);
    const scrollContainer = document.getElementById('scroll-div');

    if (categoryElement && scrollContainer) {
      scrollContainer.scrollTo({
        top: categoryElement.offsetTop - 10,
        behavior: 'smooth',
      });
    }

    setOpenMenu(false);
  };

  if (!APIData?.CategoryList) {
    return <p>Loading Data...</p>;
  }

  return (
    <>
      {OpenMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            pointerEvents: 'none',
          }}
        >
          <div
            ref={modalRef}
            className="mobile-category"
            onClick={(e) => e.stopPropagation()}
            style={{
              pointerEvents: 'auto',
              width: '200px',
              backgroundColor: 'white',
              boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',
              margin: '10px auto',
            }}
          >
            <div
              className="category-details"
              style={{ height: '300px', borderRadius: 0 }}
            >
              <List
                className="List"
                sx={{
                  position: 'relative',
                  overflow: 'auto',
                  height: '100%',
                  marginTop: '5px',
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                {APIData.CategoryList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategoryClick(item.CategryName)}
                    style={{
                      backgroundColor:
                        activeCategory?.trim().toLowerCase() ===
                        item.CategryName.trim().toLowerCase()
                          ? '#007fe0'
                          : 'transparent',
                      listStyle: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <ul>
                      <ListItem>
                        <ListItemText
                          primary={item.CategryName}
                          primaryTypographyProps={{
                            style: {
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: '16px',
                              textTransform: 'capitalize',
                              color:
                                activeCategory?.trim().toLowerCase() ===
                                item.CategryName.trim().toLowerCase()
                                  ? 'white'
                                  : 'black',
                            },
                          }}
                          className="category-name"
                        />
                      </ListItem>
                    </ul>
                  </li>
                ))}
              </List>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
