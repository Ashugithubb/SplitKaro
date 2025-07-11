import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import Image from 'next/image'; // If using Next.js

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        {/* Logo + AppName */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Replace with your own logo path */}
          <Image src="https://framerusercontent.com/images/VUqdevjirDo8kn502U0VpXsVw.svg?scale-down-to=2048" alt="Logo" width={32} height={32} />
          <Typography variant="h6" noWrap>
            SplitKaro
          </Typography>
        </Box>

        {/* Spacer */}
        <Box flexGrow={1} />

        {/* Notification Bell + Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar alt="Ashu" src="/profile.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
