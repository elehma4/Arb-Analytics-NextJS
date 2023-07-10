'use client'

import React, {useState, useEffect} from "react";
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux'
import {signIn, checkToken} from '../../slices/authSlice'



const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isLoading = useSelector(state => state.auth.isLoading)
  const token = useSelector(state => state.auth.token) 

  const dispatch = useDispatch();


  useEffect(() => {
    
    if(localStorage.token){
      dispatch(checkToken())
    }
  
  }, [])


  useEffect(() => {
    
    if(!isLoading && token ){
      window.location.href = '/';
    }
  }, [token])
  
  

  const handleSubmit = (e) => {
    
    e.preventDefault() 

    let dataObj = {
      formData: {
        email, password
      }
    }

    dispatch(signIn(dataObj))
  }
  return (
    <div className="mt-5">
      <div className="grid place-items-center">
        <div className="register">
          <img
            className="h-16"
            src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4"
            alt=""
          />
          <h2 className="text-2xl font-bold">Sign In</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form__field">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@mailaddress.com"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="form__field">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="form__field">
              <input
                type="submit"
                value="Log In"
                className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded cursor-pointer"
              />
            </div>
          </form>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/registration" className="text-blue-500">
      Register here
    </Link>
          </p>
        </div>
      </div>
    </div>
  );
};



export default Signin;











