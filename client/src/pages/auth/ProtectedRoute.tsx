import {RouteProps, Navigate, Route, useNavigate, useLocation, Outlet} from 'react-router-dom';
import React from 'react';
import { AppDispatch, useAppSelector } from "../../reduxStore/configureStore";
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../reduxStore/slices/userSlice';



export const ProtectedRoute = () => {
    const { user, loading } = useAppSelector((state) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      //check if user JWT is valid.
          dispatch(verifyUser());
    }, []);
  
    // Check if authentication is still loading
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Check if the user is not logged in
    if (!user || !localStorage.getItem("user")) {
      return <Navigate to="/login" />;
    }
  
    // Render the protected content
    return <Outlet />;
  };
    


