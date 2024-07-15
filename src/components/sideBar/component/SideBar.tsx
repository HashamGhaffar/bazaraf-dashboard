import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import ItemIcon from '@mui/icons-material/Widgets';
import ThemeIcon from '@mui/icons-material/ColorLens';
import TableIcon from '@mui/icons-material/TableChart';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../utils';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashBoard' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Category', icon: <CategoryIcon />, path: 'categoryList' },
    { text: 'Modifier', icon: <SaveAsIcon />, path: '/modifiers' },
    { text: 'Modifier List', icon: <ListIcon />, path: '/modifierList' },
    { text: 'Item', icon: <ItemIcon />, path: '/items' },
    { text: 'Theme', icon: <ThemeIcon />, path: '/theme' },
    { text: 'Table', icon: <TableIcon />, path: '/table' },
    { text: 'Delivery Location', icon: <LocationOnIcon />, path: '/location' },
    { text: 'Setting', icon: <SettingsIcon />, path: '/setting' },
  ];

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const list = () => (
    <Box sx={{ width: isMobile ? 240 : 300 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List style={{ marginTop: '30%', marginLeft: '20px' }}>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={() => handleMenuItemClick(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const currentDate = format(new Date(), 'PP');

  return (
    <Box  >
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'space-between',
           height: isMobile ? '70px' : 'auto',
           }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            {!isMobile && <img src={Logo} alt="Logo" style={{ height: '50px' }} />}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isMobile && <Typography variant="body1">{currentDate}</Typography>}
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/profile')}>
              <Avatar alt="Profile" src="path-to-your-profile-image.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1,}}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Sidebar;
