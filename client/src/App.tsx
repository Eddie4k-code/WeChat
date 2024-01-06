
import './App.css'
import React from 'react'
import { Navbar } from './components/Navbar';
import { Login } from '@mui/icons-material';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

const App = () => {


  return (
    <>
    <RouterProvider router={router} />
    <Navbar />
    </>
  );
}

export default App;

