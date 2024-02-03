import {RouteProps, Navigate, Route, useNavigate} from 'react-router-dom';
import React from 'react';
import { useAppSelector } from "../../reduxStore/configureStore";
import {useEffect} from 'react';

interface ProtectedRouteProps extends RouteProps {
    component: React.Node;
}


export const ProtectedRoute = (props: ProtectedRouteProps) => {

    const {user, loading} = useAppSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {

        if (loading) {
            return
        }
        console.log("w");
        console.log(user);

        if (!user) {
            navigate("/login")
        }

      
    }, []);

    
      // If authenticated, render the provided component
      return (
        
        <>
        {props.component}
        </>
    
      );

}

    


