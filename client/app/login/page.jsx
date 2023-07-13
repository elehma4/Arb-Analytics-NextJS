'use client'

import React, {useState, useEffect} from "react";
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux'
import {signIn, checkToken} from '../../slices/authSlice'



const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = useSelector(state => state.isLoading);
  const token = useSelector(state => state.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(checkToken());
    }
  }, []);

  useEffect(() => {
    if (!isLoading && token) {
      window.location.href = '/';
    }
  }, [token]);

  const handleSignIn = (e) => {
    e.preventDefault();

    let dataObj = {
      formData: {
        email,
        password
      }
    };
    
    const promise = Promise.resolve(dispatch(signIn(dataObj)));

    promise.then(() => {
      // Redirect to "/"
      window.location.href = '/';
    });
    dispatch(signIn(dataObj));

  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
  <div className='relative w-[380px] h-[420px] bg-darkblue-800 rounded-lg overflow-hidden'>
    <div className="absolute w-[380px] h-[420px] bg-gradient-to-r from-blue-500 via-blue-500 to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right" />
    <div className="absolute w-[380px] h-[420px] bg-gradient-to-r from-blue-500 via-blue-500 to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right" />
    <div className="absolute inset-1 bg-gray-800 rounded-lg z-10 p-5">
      <form onSubmit={handleSignIn}>
        <h2 className="text-xl font-semibold text-blue-500 text-center mb-12">Sign in</h2>
        {/* -----email */}
        <div className="relative flex flex-col mb-12">
  <input
    type="email"
    autoFocus
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="info@mailaddress.com"
    required
    // pattern="^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
    className="w-full px-4 py-2 border rounded"
  />
 
  
  <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]" />
  <label
    className="peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0
      peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8 text-blue-500"
  >
    Enter Email
  </label>
</div>
{/* emaillll */}
        <div className="relative flex flex-col mb-12">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            minLength={4}
            className="w-full px-4 py-2 border rounded"
          />
         
          <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]" />
          <label
  className="peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0
    peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8 text-blue-500"
>
  Enter Password
</label>
        </div>

        <button
  type="submit"
  className="py-3 text-gray-100 bg-blue-500 w-full rounded hover:bg-blue-600 hover-scale-105 duration-300 mb-4"
>
  Login
</button>

<p className="text-sm mt-4 text-white">
  Don't have an account?{" "}
  <Link href="/registration" className="text-blue-500">
    Register here
  </Link>
</p>
      </form>
    </div>
  </div>
</div>

  );
};

export default Signin;









