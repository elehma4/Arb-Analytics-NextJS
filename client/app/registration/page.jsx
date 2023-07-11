'use client'
import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Link from 'next/link';
import { signUp } from '../../slices/authSlice';
import { googleSignUp } from '../../slices/authSlice';
import Swal from 'sweetalert2';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector(state => state.auth.isLoading)
  const token = useSelector(state => state.auth.token)
 
  const dispatch = useDispatch()  

  useEffect(() => {

    console.log(token)
   

    if (!isLoading && token) {
      window.location.href = '/login';
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      formData: {
        email,
        password,
      },
    };


    
    dispatch(signUp(data))
    .then(() => {
      Swal.fire({
        title: 'Signup successful!',
        text: 'You have successfully signed up!',
        icon: 'success',
      });
    })
    .catch(() => {
      Swal.fire({
        title: 'Signup failed!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
      });
    });
   
   

  };
// =====Google dispatch
  const handleGoogleSignUp = () => {

    dispatch(googleSignUp());
  };
//=======Google dispatch

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    
    <div className='bg-gray-800 flex flex-col justify-center'>
        <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
            <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN UP</h2>
            <div className='flex flex-col text-gray-400 py-2'>
                <label>Email</label>
                <input  type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address" className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' />
            </div>
            <div className='flex flex-col text-gray-400 py-2'>
                <label>Password</label>
                <input  type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' />
            </div>
            <div className="flex justify-between text-gray-400 py-2">
 
                  <p className="text-sm">
                      Already have an account?{" "}
                      <Link href="/login"  className="text-blue-500">
                        Login here
                      </Link>
                  </p>
              </div>
            <button  type="submit"  value="Sign Up" className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SIGNUP</button>
            <button  onClick={handleGoogleSignUp}  value="Sign Up" className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SIGNUP WITH GOOGLE</button>
            
        </form>
    </div>
</div>

  );
};

export default Signup;












