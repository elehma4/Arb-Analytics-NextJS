import React from "react";
import {signOut} from '../slices/authSlice'
import {useDispatch} from 'react-redux'

const SignoutButton = () => {

    const dispatch = useDispatch()

    const logout = () => {

        dispatch(signOut())

        window.location.href = '/login';

    }
  return (
    <div>

        <button onClick={()=> logout()}>Sign Out</button>
      
    </div>
  )
}

export default SignoutButton
