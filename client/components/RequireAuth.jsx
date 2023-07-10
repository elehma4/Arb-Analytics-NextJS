import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {checkToken} from '../slices/authSlice'

const RequireAuth = (props) => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    useEffect(() => {
      
        dispatch(checkToken())
      
    }, [])

    console.log(token)
    

    useEffect(() => {
      
        // if(!token){
        //     window.location.href = '/login';
        // }
      
    }, [token])
    
  
    return props.children

}

export default RequireAuth