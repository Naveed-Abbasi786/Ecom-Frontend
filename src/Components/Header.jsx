import React from 'react';
import MiniNavbar from './Header/MiniNavbar';
import MainNavbar from './Header/MainNavbar';
import Navbar from './Header/Navbar';

export default function Header() {
  return (
    <div>
      <MiniNavbar />
        <MainNavbar />
      <Navbar />
    </div>
  );
}
