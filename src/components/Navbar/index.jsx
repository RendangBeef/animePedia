'use client';
import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton,TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchInput from '../SearchInput';
import Link from 'next/link';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* warna navbar ganti jadi #474F7A */}
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Animepedia</Link>
          </Typography>
          <SearchInput/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
