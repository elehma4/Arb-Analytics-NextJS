"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main';


export default function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
  }, []);

  const handleSmallScreenChange = (value) => {
    setIsSmallScreen(value);
  };

  return (

    
      <div className="h-full">
        <Navbar onSmallScreenChange={handleSmallScreenChange} />
        <Main isSmallScreen={isSmallScreen} />
      </div>


    
  );
}
