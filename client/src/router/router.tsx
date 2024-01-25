import { createBrowserRouter } from "react-router-dom";
import App from '../App.tsx'
import Login from '../pages/auth/Login.tsx'
import Register from "../pages/auth/Register.tsx";
import ServerDashboard from "../pages/servers/ServerDashboard.tsx";

const router = createBrowserRouter([
    {
    path: '/',
    element: <App />,
    children: [
        {path: 'login', element: <Login />},
        {path: 'register', element: <Register />},
        {path: '/dashboard', element: <ServerDashboard />}
    ]
}
]);

export default router;