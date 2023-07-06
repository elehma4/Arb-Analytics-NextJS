'use client';

import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../../slices/authSlice';
import mainSlice from '../../slices/mainSlice'

export const store=configureStore({ reducer: { auth: authSlice, main: mainSlice } });
