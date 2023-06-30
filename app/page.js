import React from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authSlice from '@/components/auth/authSlice';
import   Signin from './login/page';
import Signup from './registration/page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Creating the Redux store using 'configureStore'
const store = configureStore({
  reducer: authSlice,
  // Other configuration options can be added here if needed
});

export default function Home() {
  return (
    <Provider store={store}>
      <Router>
      <BaseLayout>
          <Routes>


            <Route path='/' element={<App />}/>
            <Route path='/welcome' element={<Welcome />}/>
            <Route path='/Signup' element={<Signup />}/>
            <Route path='/Signin' element={<Signin />}/>


            {/* <Route path="/admin" element={<RequireAuth />}>
              <Route path='feature' element={<Feature />}/>
            </Route> */}
          </Routes>


      </BaseLayout>
      </Router>
    </Provider>
  );
}



 <div>
<Navbar />
<Main />
</div>


