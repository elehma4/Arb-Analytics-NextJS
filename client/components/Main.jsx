import React from 'react'

const Main = ( {isSmallScreen} ) => {


  return (

    <div id='home' className='w-full h-screen text-center'>

        <div className={` relative ${isSmallScreen ? 'top-14' : 'left-56'} bg-gray-800 max-w-[1240px] h-full mx-auto p-2 flex justify-center items-center `}>
          
          <div className='bg-gray-900 h-24 flex flex-col'></div>

        </div>

    </div>
  )
}

export default Main