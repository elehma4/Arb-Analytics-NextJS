import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'
import Link from 'next/link';
import Star from './Star'


const Favorites = ({item}) => {

  return (
    <div className="flex">
        <Star item={item}/>
        <Link className="flex" href={`/protocols/${item.name}`}>
            <div>{item.name}</div>
        </Link>
    </div>
  )
}

export default Favorites
