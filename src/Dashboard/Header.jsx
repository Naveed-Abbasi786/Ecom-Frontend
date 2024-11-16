// CustomHeader.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function CustomHeader({ darkMode, onToggleDarkMode }) {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src="your-logo-url.png" alt="Logo" style={{ height: '40px' }} />
        </IconButton>
        
        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>

        {/* Dark Mode Toggle */}
        <IconButton onClick={onToggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default CustomHeader;
