

import React, { useEffect, useState } from 'react'
import '../app/styles/main.css'
import {BsSearch} from 'react-icons/bs'
import { getProtocols } from '../slices/mainSlice';
import { useDispatch, useSelector } from 'react-redux';

const Main = ( {isSmallScreen} ) => {

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);


  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const topClass = windowHeight <= 777 ? 'top-[80%]' : 'top-[75%]';

  let chartClass = ''

  if (windowHeight <= 777) {
    chartClass = 'h-1/2';
  } else if (windowHeight > 777 && windowHeight <= 970) {
    chartClass = 'h-3/5';
  } else if (windowHeight > 970 && windowHeight <= 1200){
    chartClass = 'h-[70%]';
  } else {
    chartClass = 'h-[75%]';
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProtocols())
  }, [dispatch]);

  const protocols = useSelector((state) => state.main.protocols);

  console.log(protocols)

  return (
    <div id='home' className='h-screen'>

        <div className={` relative ${isSmallScreen ? 'top-14 mainSmall' : 'left-56 mainBig'} bg-gray-800 h-full mx-auto p-2 sm:p-4 flex flex-col justify-start items-center`}>
          
          <Search />


          <div className='w-full h-3/5 sm:h-1/2 lg:h-3/5 bg-gray-900 rounded-3xl mt-6 p-6 text-gray-400 sm:grid grid-cols-4 grid-rows-4 grid-flow-col gap-2 '>
              <div className='font-bold max-sm:grid grid-cols-3 row-span-4'>
                <div className='m-2'>
                <p className='text-sm md:text-xl m-1 text-left'>Total Value Locked </p>
                <p className='max-sm:text-base md:text-2xl text-lg sm:mb-2 text-white m-1'>$2.17b</p>
                </div>
                <div className='m-2'>
                <p className='text-sm md:text-lg m-1 mb-2 text-left'>24hr Fees</p>
                <p className='max-sm:text-base text-lg text-white sm:mb-2 ml-1'>$205,417</p>
                </div>
                <div className='m-2'>
                <p className='text-sm md:text-lg m-1 text-left'>$ARB Price</p>
                <p className='max-sm:text-base text-lg text-white sm:mb-2 ml-1'>$1.17</p>
                </div>
              </div>
              
              
              <div className='w-full h-auto m-auto flex items-start justify-start sm:p-2 font-normal col-span-3 mb-2'>
                <button className='bg-[#3267D6] lg:text-lg hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>TVL</button>
                <button className='bg-[#3267D6] lg:text-lg hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>Fees</button>
                <button className='bg-[#3267D6] lg:text-lg hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>$ARB Price</button>
              </div>
              <div className={`border-2 w-full ${chartClass} sm:h-auto row-span-3 col-span-3`}>
                  Chart goes here
              </div>
              
          </div>            

          <div className={`max-md:absolute ${topClass} w-full text-white border-b border-gray-400 mt-2 p-2`}>
            <p className='flex items-center max-sm:justify-center px-4 text-xl font-semibold my-2'><img className='w-7 mx-2' src="/assets/arbitrum-logo.png" alt="/" />Protocols on Arbitrum</p>
          

          <div className='w-full text-white grid grid-cols-4'>
            <div className='p-2 font-semibold px-4 flex justify-center items-center border border-gray-400'>
              <p className='px-2 max-sm:text-sm'>Name</p>
            </div> 
            <p className='flex items-center justify-center border border-gray-400 p-2 font-semibold max-sm:text-sm text-center'>TVL</p> 
            <p className='flex items-center justify-center border border-gray-400 p-2 font-semibold max-sm:text-sm text-center'>MCAP</p>
            <p className='flex items-center justify-center border border-gray-400 p-2 font-semibold max-sm:text-sm text-center'>TVL/MCAP</p>
          </div>

          {/* BEGIN PROTOCOLS */}
          <div className='w-full text-white grid grid-cols-4'>
          { 
            protocols.map((protocol, index) => (
                <React.Fragment key={index}>
                <div className='p-2 px-4 flex justify-center items-center border border-gray-400'>
                  <a 
                  href={protocol.url} 
                  className='px-2 max-sm:text-sm text-center hover:text-blue-600 hover:font-bold flex justify-center items-center'
                  >
                    {
                      window.innerWidth > 768 ?  <img className='w-7 mx-2 rounded-full' src={protocol.logo} alt="protocol" />
                      : <div/>
                    }
                    {protocol.name}
                  </a>
                </div> 
                <p className='flex items-center justify-center border border-gray-400 p-2 max-sm:text-sm max-[420px]:text-xs text-center'>{protocol.TVL ? `$${Math.round(protocol.TVL)}` : '-'}
                </p> 
                <p className='flex items-center justify-center border border-gray-400 p-2 max-sm:text-sm max-[420px]:text-xs text-center'>{protocol.MCAP ? `$${Math.round(protocol.MCAP)}` : '-'}
                </p>
                <p className='flex items-center justify-center border border-gray-400 p-2 max-sm:text-sm max-[420px]:text-xs text-center'>{protocol.TVL && protocol.MCAP ? `${(protocol.TVL / protocol.MCAP).toFixed(2)}` : '-'}
                </p>
              </React.Fragment>
            ))
          }
          </div>
          {/* END PROTOCOLS */}
          </div>

          


        </div>

    </div>
  )
}

export default Main