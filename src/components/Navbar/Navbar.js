import { Link, useNavigate } from "react-router-dom";


// Material UI - Core
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

// Material UI - Icons
import MenuIcon from '@mui/icons-material/Menu';

import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const Navbar = () => {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = (url) => {
    navigate(url);
    setAnchorElUser(null);
  };

  return (
    <AppBar elevation={1} sx={{ background: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/"><Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            <p>Menu</p>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user ?
                 <Avatar alt="user avatar" src={user.image} />: 
                 <Avatar alt="" src="/static/images/avatar/2.jpg" />
              }
              </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            {!isLoggedIn && (
              <>
              <MenuItem onClick={() => handleCloseUserMenu("/signup")}>
                  <Typography textAlign="center">SignUp</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseUserMenu("/login")}>
                  <Typography textAlign="center">Login</Typography>
              </MenuItem>
              </>
            ) }
            {isLoggedIn && (
              <>
              <MenuItem onClick={() => handleCloseUserMenu("/profile")}>
                  <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={logOutUser}>
                  <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              </>
            ) }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
