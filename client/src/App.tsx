
import './App.css'
import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from './reduxStore/slices/userSlice';
import { AppDispatch, useAppSelector } from './reduxStore/configureStore';
import webSocket from './socket/socket';




const App = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useAppSelector(state => state.user);
  
  
  

  useEffect(() => {

    webSocket.on('connect', () => {
      console.log("Connected to server!");
    });



  //see if the current user is authenticated
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

