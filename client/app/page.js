"use client";

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Main from '../components/Main'

export default function Home() {

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    
    // Initial check for screen size
    setIsSmallScreen(window.innerWidth < 640); // Adjust the breakpoint as needed
    
  }, [])
  

  const handleSmallScreenChange = (value) => {
    setIsSmallScreen(value);
  };  return (
    <div>
      <Navbar onSmallScreenChange={handleSmallScreenChange}/>
      <Main isSmallScreen={isSmallScreen}/>
    </div>
  )
}
