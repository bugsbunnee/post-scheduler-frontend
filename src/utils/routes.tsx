import { Navigate, RouteObject } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Documents from "../pages/Documents";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Login />},
            { path: '/register', element: <Register />},
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home/> },
            { path: 'documents', element: <Documents /> },
            { path: 'logout', element: <Logout /> }
        ]
    },
    { path: '*', element: <Navigate to='/' /> },
];

export default routes;