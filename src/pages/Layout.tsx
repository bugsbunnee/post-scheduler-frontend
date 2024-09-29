import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from "../store/auth";

const Layout: React.FC = () => {
    const { user } = useAuthStore();
    
    if (user) return <Navigate to='/dashboard' />;
    return <Outlet />;
}
 
export default Layout;