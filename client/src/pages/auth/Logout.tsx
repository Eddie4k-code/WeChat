import { Navigate, Outlet } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../reduxStore/configureStore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../reduxStore/slices/userSlice";

const Logout = () => {
    const {user, loading} = useAppSelector(state => state.user);

    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(logout());
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }


    
    // Check if the user is not logged in
    return <Navigate to="/login" />;
    
}

export default Logout;