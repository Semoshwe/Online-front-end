import * as React from 'react';
import {useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import DrawerComponent from './DrawerComponent';
import Favorite from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ExpandMore from '@mui/icons-material/ExpandMore';
import {getAllProducts, searchProducts} from '../services/ProductService';

// Styles for the Search component
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// Styles for the Search Icon Wrapper
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Styles for the Input Base
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Styles for the Favorite Icon
const StyledFavoriteIcon = styled(Favorite)(({ theme }) => ({
  backgroundColor: 'red',
  display: 'block',
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  color: 'white',
}));

/**
 * PrimarySearchAppBar is a functional component that renders the application's primary
 * AppBar with search functionality, notifications, and user profile management. It
 * also includes a drawer component for additional navigation options.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  // Menu IDs
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  // Updated renderMenu with Link to /profile
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  // FOR NAV categories
  const [anchorElMen, setAnchorElMen] = useState(null);
  const [anchorElWomen, setAnchorElWomen] = useState(null);
  const [anchorElKids, setAnchorElKids] = useState(null);

  const handleNavMenuOpen = (event, setAnchorEl) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavMenuClose = (setAnchorEl) => {
    setAnchorEl(null);
  };

  // For search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults,setShowSearchResults] = useState(false)

  const handleSearch = async (keyWord) => {
    setSearchTerm(keyWord);
    if(keyWord.length >= 1){
      setSearchResults(true)
      try{
        const response = await searchProducts(keyWord)
        setSearchResults(response.data);
        setNoResults(response.data.length === 0)
        console.log(response.data);
      } catch (error){
        console.error("Error searching: ", error);
      }
    } else{
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false)
    }
  }
  // const handleSearch = async (keyPhrase) => {
  //   setSearchTerm(keyPhrase);
  //
  //   if (keyPhrase.length >= 1) {
  //     setShowSearchResults(true);
  //     try {
  //       const response = await searchProducts(keyPhrase);
  //
  //       // Check if response and response.data are defined
  //       if (response && response.data) {
  //         setSearchResults(response.data);
  //         setNoResults(response.data.length === 0);
  //       } else {
  //         // Handle case when response.data is undefined
  //         setSearchResults([]);
  //         setNoResults(true); // No results since response.data is missing
  //       }
  //
  //       console.log(response.data);
  //
  //     } catch (error) {
  //       console.error("Error searching: ", error);
  //     }
  //   } else {
  //     setShowSearchResults(false);
  //     setSearchResults([]);
  //     setNoResults(false);
  //   }
  // };


  // Updated renderMobileMenu with Link to /profile
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <StyledFavoriteIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem component={Link} to="/profile" onClick={handleMobileMenuClose}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DrawerComponent
        open={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen} // Open drawer on click
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => window.location.href = '/'}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Capstore
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)} // Set searchFocused to true when search bar is focused
                onBlur={() => setSearchFocused(false)} // Set searchFocused to false when search bar loses focus
            />
          </Search>
          {showSearchResults && (
              <ul className="list-group" style={{ position: "absolute", top: "100%", left: 0, width: "calc(100% - 1rem)", backgroundColor: "var(--body_color)", border: "1px solid #ced4da", borderRadius: "0.25rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", zIndex: 1000 }}>
                {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <li key={result.productId} className="list-group-item" style={{ padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: "var(--search_result-bg)" }}>
                          <a href={`/product-detail/${result.productId}`} className="search-result-link" style={{ textDecoration: "none", color: "inherit" }}>
                            <span>{result.name}</span>
                          </a>
                        </li>
                    ))
                ) : (
                    noResults && (
                        <p className="no-results-message" style={{ marginTop: "0.5rem", color: "#dc3545", display: "flex", justifyContent: "center" }}>
                          No Product with such Name
                        </p>
                    )
                )}
              </ul>
          )}

          {/*Add Men, Women, and Kids as navigation links in the AppBar*/}
          <Box sx={{ display: 'inherit', justifyContent: 'center', alignItems: 'center', ml: 30 }}>
            <Button
              color="inherit"
              sx={{ mx: 5 }}
              onClick={(event) => handleNavMenuOpen(event, setAnchorElMen)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Men
                <ExpandMore />
              </Box>
            </Button>
            <Menu
              anchorEl={anchorElMen}
              open={Boolean(anchorElMen)}
              onClose={() => handleNavMenuClose(setAnchorElMen)}
            >
              <MenuItem component={Link} to="/product-listing" onClick={() => handleNavMenuClose(setAnchorElMen)}>T-shirts</MenuItem>
            </Menu>

            <Button
              color="inherit"
              sx={{ mx: 5 }}
              onClick={(event) => handleNavMenuOpen(event, setAnchorElWomen)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Women
                <ExpandMore />
              </Box>
            </Button>
            <Menu
              anchorEl={anchorElWomen}
              open={Boolean(anchorElWomen)}
              onClose={() => handleNavMenuClose(setAnchorElWomen)}
            >
              <MenuItem component={Link} to="/product-listing" onClick={() => handleNavMenuClose(setAnchorElWomen)}>T-shirts</MenuItem>
            </Menu>

            <Button
              color="inherit"
              sx={{ mx: 5 }}
              onClick={(event) => handleNavMenuOpen(event, setAnchorElKids)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Kids
                <ExpandMore />
              </Box>
            </Button>
            <Menu
              anchorEl={anchorElKids}
              open={Boolean(anchorElKids)}
              onClose={() => handleNavMenuClose(setAnchorElKids)}
            >
              <MenuItem component={Link} to="/product-listing" onClick={() => handleNavMenuClose(setAnchorElKids)}>Tops</MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <StyledFavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}