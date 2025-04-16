import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../../assets/css/Categories.css';
import { APIResponse } from '../ContextData';

export default function MobileCategories() {
  const { APIData, SetAPIData, OpenMenu, setOpenMenu } = React.useContext(APIResponse);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const modalRef = React.useRef(null);

  // Close on outside click
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
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [OpenMenu, setOpenMenu]);

  if (!APIData || !APIData.CategoryList) {
    return <p>Loading Data...</p>;
  }

  return (
    <>
      {OpenMenu && (
        <div
          style={{
            position: 'absolute',
            top: `${window.scrollY}px`, // Use scroll position
            left: '50%',
            transform: 'translateX(-50%)',
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
            }}
          >
            <div className="category-details" style={{ height: '300px', borderRadius: '0' }}>
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
                    onMouseEnter={() => setActiveIndex(index)}
                    style={{
                      backgroundColor: activeIndex === index ? '#007fe0' : 'transparent',
                      listStyle: 'none',
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
                              color: activeIndex === index ? 'white' : 'black',
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
