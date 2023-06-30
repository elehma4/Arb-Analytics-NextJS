"use client";

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import authSlice from '../slices/authSlice';
import mainSlice from '../slices/mainSlice';

export default function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 640);
  }, []);

  const handleSmallScreenChange = (value) => {
    setIsSmallScreen(value);
  };

  return (
    <Provider store={configureStore({ reducer: { auth: authSlice, main: mainSlice } })}>
      <div className="h-full">
        <Navbar onSmallScreenChange={handleSmallScreenChange} />
        <Main isSmallScreen={isSmallScreen} />
      </div>
    </Provider>
  );
}
