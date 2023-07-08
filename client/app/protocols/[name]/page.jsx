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

  return (
    <div id='protocols' className='h-screen'>

      <Navbar onSmallScreenChange={handleSmallScreenChange} />

      <div className={` relative ${isSmallScreen ? 'top-14 mainSmall' : 'left-56 mainBig'} bg-gray-800 h-full mx-auto p-2 sm:p-4 flex flex-col justify-start items-center`}>

      

        {protocol && (
          <>
          <img src={protocol.logo} alt="" className='w-44 rounded-full' />
          <div className='text-white text-3xl font-semibold my-2'>{protocol.name}</div>
          <div className='text-white text-center mb-4'>{protocol.description}</div>

          <div className='w-full h-1/2 grid grid-cols-4 grid-rows-4 rounded-3xl bg-gray-900'>

            <div className='col-span-4 flex items-center justify-evenly'>
              <button className='bg-[#3267D6] lg:text-lg hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>TVL Chart</button>
              <div>
                <p className='text-sm md:text-xl m-1 text-left text-gray-400'>Total Value Locked </p>
                <p className='max-sm:text-base md:text-2xl text-lg sm:mb-2 text-white m-1'>$2.17b</p>
              </div>
              
              <button className='bg-[#3267D6] lg:text-lg hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>${protocol.symbol} Chart</button>
              <div>
                <p className='text-sm md:text-lg m-1 text-left text-gray-400'>${protocol.symbol} Price</p>
                <p className='max-sm:text-base text-lg text-white sm:mb-2 ml-1'>$1.17</p>
              </div>
              
            </div>

            
            <div className='col-span-4 row-start-2 row-span-full border'>
              Charts here
            </div>

          </div>

          </>
        )}
          

      </div>

    </div>
  );
};

export default DetailsPage;
