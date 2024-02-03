import {RouteProps, Navigate, Route, useNavigate, useLocation, Outlet} from 'react-router-dom';
import React from 'react';
import { useAppSelector } from "../../reduxStore/configureStore";
import {useEffect} from 'react';



export const ProtectedRoute = () => {
    const { user, loading } = useAppSelector((state) => state.user);
  
    // Check if authentication is still loading
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Check if the user is not logged in
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    // Render the protected content
    return <Outlet />;
  };
    


