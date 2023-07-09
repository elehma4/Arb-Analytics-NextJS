"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Home from '../../page'
import Navbar from '@/components/Navbar';

const DetailsPage = ({params}) => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
  }, []);

  const handleSmallScreenChange = (value) => {
    setIsSmallScreen(value);
  };

  const protocols = useSelector(state=>state.main.protocols)

  const [protocol, setProtocol] = useState(null);

  if(params){
    useEffect(() => {
      if (params && params.name) {
        console.log(params.name);
        const originalString = params.name;
        const modifiedString = originalString.replace(/%20/g, ' ');
        console.log(modifiedString);
        console.log(protocols)
        const foundProtocol = protocols.find((protocol) => {
          console.log(protocol.name, modifiedString)
          return protocol.name === modifiedString});
        setProtocol(foundProtocol);
        console.log(protocol)
      }
    }, []);
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showVolume, setShowVolume] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setShowVolume(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div id='protocols' className='h-screen'>

      <Navbar onSmallScreenChange={handleSmallScreenChange} />

      <div className={` relative ${isSmallScreen ? 'top-14 mainSmall' : 'left-56 mainBig'} bg-gray-800 h-full m-auto p-2 sm:p-4 flex flex-col justify-start items-center`}>

        {protocol && (
          <>
          <img src={protocol.logo} alt="" className='w-44 rounded-full border-2 border-gray-900' />
          <div className='text-white text-3xl font-semibold my-2'>{protocol.name}</div>
          <div className='text-white text-center mb-4'>{protocol.description}</div>

          <div className='w-full h-1/2 grid lg:grid-cols-6 lg:grid-rows-5 gap-2 bg-gray-900 rounded-md md:grid-cols-4 md:grid-rows-4 sm:grid-cols-4 sm:grid-rows-4 max-sm:grid-cols-4 max-sm:grid-rows-4'>
            <div className='lg:col-span-3 md:col-span-4 sm:col-span-4 max-sm:col-span-4 flex'>
              <div className='flex items-center justify-start'>
                <button className='bg-[#3267D6] hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>TVL Chart</button>
                <div>
                  <p className='m-1 text-left text-gray-400'>Total Value Locked </p>
                  <p className='sm:mb-2 text-white m-1'>$2.17b</p>
                </div>
              </div>
              <div className='flex items-center justify-start'>
                <button className='bg-[#3267D6] hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>${protocol.symbol} Chart</button>
                <div>
                  <p className='m-1 text-left text-gray-400'>${protocol.symbol} Price</p>
                  <p className='text-white sm:mb-2 ml-1'>$1.17</p>
                </div>
              </div>
            </div>

          { showVolume &&
            <div className='text-gray-400 flex justify-center items-center lg:col-span-3'>
              ${protocol.symbol} Volume
            </div>
          }
            
            <div className='m-1 lg:col-span-3 row-span-full border max-lg:h-auto md:row-start-2 md:col-span-4 sm:row-start-2 sm:col-span-4 max-sm:row-start-2 max-sm:col-span-4 p-1'>
              Charts here
            </div>

          {showVolume &&
            <div className='lg:col-start-4 lg:col-span-3 items-center justify-center row-start-2 row-span-4 m-1'>
              <div className='border flex justify-center items-center text-gray-400 h-full'>
                Bar Chart
              </div>
            </div> 
          }  
            
          </div>

          {
            !showVolume &&
            <div className='w-full h-1/2 grid grid-rows-5 gap-2 bg-gray-900 rounded-md my-4'>
              <div className='text-gray-400 flex justify-center items-center'>
                ${protocol.symbol} Volume
              </div>
              <div className='flex items-center justify-center row-start-2 row-span-4 m-1'>
                <div className='border flex justify-center items-center text-gray-400 h-full w-full'>
                  Bar Chart
                </div>
            </div> 
            </div>
          }

          </>
        )}
          

      </div>

    </div>
  );
};

export default DetailsPage;
