'use client'; // Add this if you're using any client-side hooks (like MUI or interactivity)

import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useAppDispatch } from '../redux/store/store';
import { UserInfo } from '../redux/slice/user.slice';
import { error } from 'console';
import { useAppSelector } from '../redux/hook/hook';
import { Button } from '@mui/material';
import axios from 'axios';

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleAvatarClick = () => {
    router.push('/profile');
  }
 useEffect(() => {
  console.log("start");
  dispatch(UserInfo());
}, [dispatch]);

const {profile,loading,error} =  useAppSelector((state)=>state.profile);
const handelLogoutClick = async ()=>{
    try{
      const res = await axios.post('http://localhost:3001/auth/logout');
      console.log(res.data);
      router.push('/login')
    }
    catch(err){
      console.log(err)
    }
}

  return (
    <AppBar position="static" color="secondary" >
      <Toolbar>
        {/* Logo + AppName */}
        <Box display="flex" alignItems="center" gap={1}>
          <Image
            src="https://framerusercontent.com/images/VUqdevjirDo8kn502U0VpXsVw.svg?scale-down-to=2048"
            alt="Logo"
            width={32}
            height={32}
          />
          <Typography variant="h6" noWrap>
            SplitKaro
          </Typography>
        </Box>

        <Box flexGrow={1} />

        {/* Notification Bell + Avatar */}
        <Button onClick = {handelLogoutClick} variant='contained'>Log out</Button>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar
            onClick={handleAvatarClick}
            alt="Ashu"
            src={profile?.avatar}
            sx={{ cursor: 'pointer' }}
          />

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
