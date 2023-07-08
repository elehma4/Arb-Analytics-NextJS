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

      <div className={` relative ${isSmallScreen ? 'top-14 mainSmall' : 'left-56 mainBig'} bg-gray-800 h-full m-auto p-2 sm:p-4 flex flex-col justify-start items-center`}>

        {protocol && (
          <>
          <img src={protocol.logo} alt="" className='w-44 rounded-full border-2 border-gray-900' />
          <div className='text-white text-3xl font-semibold my-2'>{protocol.name}</div>
          <div className='text-white text-center mb-4'>{protocol.description}</div>

          <div className='w-full h-1/2 grid lg:grid-cols-6 lg:grid-rows-5 gap-2 bg-gray-900 rounded-md md:grid-cols-4 md:grid-rows-4 sm:grid-cols-4 sm:grid-rows-4 max-sm:grid-cols-4 max-sm:grid-rows-4'>
            <div className='col-span-3 md:col-span-4 sm:col-span-4 max-sm:col-span-4 flex'>
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
            <div className='lg:col-span-3 lg:row-start-2 row-span-full border lg:rounded-bl-md max-lg:h-auto md:row-start-2 md:col-span-4 sm:row-start-2 sm:col-span-4 max-sm:row-start-2 max-sm:col-span-4'>
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
