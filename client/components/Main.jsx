import React from 'react'
import './main.css'

const Main = ( {isSmallScreen} ) => {


  return (

    <div id='home' className='h-screen text-center'>

          <div className={` relative ${isSmallScreen ? 'top-14 mainSmall' : 'left-56 mainBig'} bg-gray-800 h-full mx-auto p-2 flex justify-center items-center`}>
          
          <div className='bg-gray-900 h-24 flex flex-col'></div>

        </div>

    </div>
  )
}

export default Main