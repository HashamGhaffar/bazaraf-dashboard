import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './component/SideBar';

const SidebarLayout: React.FC = () => {
  return (
    <Box>
      <CssBaseline />
      <Sidebar />
      <Box component="main">
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default SidebarLayout;
