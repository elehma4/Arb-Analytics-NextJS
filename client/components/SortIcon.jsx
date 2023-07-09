import React from 'react'
import {LuArrowUpDown, LuArrowDown, LuArrowUp} from 'react-icons/lu'

const SortIcon = ({direction}) => {
  return (
    <>

    {(direction === 'default') && (
        <LuArrowUpDown></LuArrowUpDown>
    )}
    {(direction === 'asc') && (
        <LuArrowDown></LuArrowDown>
    )}
    {(direction === 'desc') && (
        <LuArrowUp></LuArrowUp>
    )}
    
    </>
  )
}

export default SortIcon
