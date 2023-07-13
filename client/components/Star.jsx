import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'
import {addFavorite, removeFavorite, getUserFavorites} from '../slices/mainSlice'

const Star = ({item}) => {
    console.log('in star')

    const dispatch = useDispatch()

    const favorites = useSelector((state) => state.main.favorites);

    const userID = useSelector((state) => state.main.userID);

    const [isFavorite, setIsFavorite] = useState(false)

    const checkFavorite = () => {

        console.log('inside check favorite')

        const isItemFavorite = favorites.some((favorite) => favorite.id === item.id);

        setIsFavorite(isItemFavorite)
        
    }

    useEffect(() => {
      
        checkFavorite()
        console.log(isFavorite)

    })
    

    useEffect(() => {
      
        checkFavorite();

    }, [favorites])

    const changeFavorite = () => {

        if(isFavorite){
            console.log('delete')
            dispatch(removeFavorite({
                userID,
                protocolID: item.id
            }))
        }
        else{
            console.log('add')
            dispatch(addFavorite({
                userID,
                protocolID: item.id
            }))
        }
    }
    
  return (
    <div className="mr-2 flex items-center">

        {isFavorite ? (
            <AiFillStar onClick={()=>changeFavorite()}/>
        ):(
            <AiOutlineStar onClick={()=>changeFavorite()}/>
        )}

      
    </div>
  )
}

export default Star
