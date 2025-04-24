"use client";
import React, { useState } from 'react'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar'

const ResponsiveNavbar = () => {
    const[showNav, setShowNav]= useState(false);
    const handleNavShow =() => setShowNav(true);
    const handleCloseNav =() => setShowNav(false);
  return (
    <div>
      <Navbar openNav={handleNavShow}/>
      <MobileNavbar showNav={showNav} closeNav={handleCloseNav}/>
    </div>
  )
}

export default ResponsiveNavbar
