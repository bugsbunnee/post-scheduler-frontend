import { setAuthTokenHeader } from "../services/http";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const KEY = 'auth-key';

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'editor';
}

export interface AuthStore {
    user: User | null;
    loginUser: (token: string) => void;
    logoutUser: () => void;
}

export const decodeToken = (token: string) => {
    try {
        return jwtDecode(token) as User | null;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export const getCurrentUser = () => {
    const token = localStorage.getItem(KEY);
    if (!token) return null;

    setAuthTokenHeader(token);

    return decodeToken(token);
};

export const persistUser = (token: string) => {
    setAuthTokenHeader(token);
    localStorage.setItem(KEY, token);
};

const useAuthStore = create<AuthStore>((set) => ({
    user: getCurrentUser(),
    loginUser: (token: string) => {
        set(() => ({ user: decodeToken(token) }));
        persistUser(token);
    },
    logoutUser: () => {
        set(() => ({ user: null }));
        localStorage.removeItem(KEY);
    },
}));

export default useAuthStore;