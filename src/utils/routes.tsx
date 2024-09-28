import { RouteObject } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/login', element: <Login />},
            { path: '/register', element: <Register />},
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage/> },
            { path: 'logout', element: <Logout /> }
        ]
    },
];

export default routes;