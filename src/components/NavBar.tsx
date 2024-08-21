import React from 'react'

import { withCookies, Cookies } from 'react-cookie';

import { AppBar, Toolbar, Typography } from '@mui/material'
import styled from '@emotion/styled'

import YouTubeIcon from '@mui/icons-material/YouTube';
import LogoutIcon from '@mui/icons-material/Logout';


const StyledTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
}));

const IconButton = styled('button')({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'inherit',
    padding: '8px',
    '&:hover': {
      opacity: 0.8,
    },
});

type NavBarProps = {
    cookies: Cookies;
};

const NavBar: React.FC<NavBarProps> = (props) => {

    const logout = () => {
        props.cookies.remove('jwt-token');
        window.location.href = '/';
    }

  return (
    <AppBar position='static'>
        <Toolbar>
            <IconButton className='logo'>
                <YouTubeIcon />
            </IconButton>

            <StyledTypography variant='h5'>Youtube</StyledTypography>

            <IconButton className='logout' onClick={logout}>
                <LogoutIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}

export default withCookies(NavBar)