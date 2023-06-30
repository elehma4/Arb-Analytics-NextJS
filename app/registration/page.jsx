'use client';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registration } from '../../components/auth/authSlice';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = useSelector(state => state.isLoading);
  const token = useSelector(state => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && token) {
      navigate('/feature');
    }
  }, [isLoading, token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      formData: {
        email,
        password
      }
    };

    dispatch(registration(data));
  };

  return (
    <div className="mt-5">
      <div className="grid place-items-center">
        <div className="register">
          <img
            className="h-16"
            src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4"
            alt=""
          />
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form__field">
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div className="form__field">
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="form__field">
              <input
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <p>
            Already have an account? <Link to="/signin">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
