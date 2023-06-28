"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';


const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for screen size
    setIsSmallScreen(window.innerWidth < 640); // Adjust the breakpoint as needed

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`fixed ${isSmallScreen ? 'top-0 w-full h-14 bg-gradient-to-r from-blue-900 to-blue-700' : 'top-0 left-0 h-full w-56'} bg-gray-800 z-100 text-white`}>
      <div className='flex flex-col items-center w-full h-full px-2 2xl:px-16'>
        <div className='flex items-center'>
        <Image src="/assets/arbitrum-logo.png" alt="/" width={isSmallScreen ? 40 : 61} height={isSmallScreen ? 20 : 29}/>
        <div className='ml-2'>Arbitrum Analytics</div>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
