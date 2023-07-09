import React from 'react'
import {LuArrowUpDown, LuArrowDown, LuArrowUp} from 'react-icons/lu'

const SortIcon = ({direction}) => {
  return (
    <div className="ml-1">

    {(direction === 'default') && (
        <LuArrowUpDown></LuArrowUpDown>
    )}
    {(direction === 'asc') && (
        <LuArrowDown></LuArrowDown>
    )}
    {(direction === 'desc') && (
        <LuArrowUp></LuArrowUp>
    )}
    
    </div>
  )
}

export default SortIcon
