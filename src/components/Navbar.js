import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext,useState } from 'react';
import LoadingScreen from "./LoadingScreen";

const allPages = ['Dashboard', 'About'];
const authPages = ['Login', 'Signup'];

function Navbar() {
    const [isLoading, setIsLoading] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  let Navigate = useNavigate();
  let context = useContext(UserContext);
  const { user, logout } = context;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutProcess = async () => {
    setIsLoading(true)
    await logout();
    setIsLoading(false)
    Navigate('/');
    handleCloseNavMenu();
  };
if (isLoading) {
  return <LoadingScreen message="Logging out ... GoodBye!" />;
}
  return (
    <AppBar position="static" color='primary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - always visible */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: '.1rem',
              fontSize: "1.4rem",
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }, // Take full width on mobile if no other elements
            }}
          >
            iNoteBook
          </Typography>

          {/* Desktop Navigation - shown only for logged in users */}
          {user && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
              {allPages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  size='small'
                  to={`/${page.toLowerCase()}`}
                  sx={{ 
                    mx: 1, 
                    color: 'white',
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button - always visible */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* Show app pages if logged in */}
              {user && allPages.map((page) => (
                <MenuItem 
                  key={page} 
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                >
                  {page}
                </MenuItem>
              ))}

              {/* Show auth options based on login state */}
              {!user ? (
                authPages.map((page) => (
                  <MenuItem 
                    key={page} 
                    component={Link}
                    to={`/${page.toLowerCase()}`}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={logoutProcess}>
                  Logout
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Desktop Auth Buttons - hidden on mobile */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
            {!user ? (
              <>
                <Button
                  variant="outlined"
                  size='small'
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ textTransform: 'none', mr: 1 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  size='small'
                  color="secondary"
                  component={Link}
                  to="/signup"
                  sx={{ textTransform: 'none' }}
                >
                  Signup
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                size='small'
                color="inherit"
                sx={{ textTransform: 'none' }}
                onClick={logoutProcess}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;