import React, { useEffect } from 'react';
import useAuthStore from '../store/auth';

const Logout: React.FC = () => {
    const { logoutUser } = useAuthStore();

    useEffect(() => {
        logoutUser();
        window.location.href = '/login';
    }, [logoutUser]);

    return null;
}
 
export default Logout;