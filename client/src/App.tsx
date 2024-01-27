
import './App.css'
import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { verifyUser } from './reduxStore/slices/userSlice';
import { AppDispatch } from './reduxStore/configureStore';

const App = () => {

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {


    //fetch current user
    dispatch(verifyUser());

  }, [dispatch]);

  return (
    <>
    <Navbar />
    <Outlet />
    </>
  );
}

export default App;

