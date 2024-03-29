import { createBrowserRouter } from "react-router-dom";
import App from '../App.tsx'
import Login from '../pages/auth/Login.tsx'
import Register from "../pages/auth/Register.tsx";
import ServerDashboard from "../pages/servers/ServerDashboard.tsx";
import { Test } from "../pages/auth/Test.tsx";
import { ProtectedRoute } from "../pages/auth/ProtectedRoute.tsx";
import { ServerPage } from "../pages/servers/ServerPage.tsx"
import Logout from "../pages/auth/Logout.tsx";


const router = createBrowserRouter([
    {
    path: '/',
    element: <App />,
    children: [

        {//The ProtectedRoute component wraps all routes that require user to be logged in
            element: <ProtectedRoute />,
            children: [
                {path: 'dashboard', element: <ServerDashboard />},
                {path:'join/:roomName', element: <ServerPage />},
                {path:'/logout', element: <Logout />}
            ]
        },

        {path: 'login', element: <Login />},
        {path: 'register', element: <Register />},
        {path:'/test', element: <Test />}
    ]
}
]);

export default router;