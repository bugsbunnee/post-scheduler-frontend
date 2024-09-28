import toast from "react-hot-toast";
import axios from "axios";

import http from "./http";

import { AuthData, RegisterData } from "../utils/schema";
import { User } from "../store/auth";

interface AuthResponse {
    token: string;
}

export const login = async (data: AuthData) => {
    try {
        const response = await http.post<AuthResponse>('/auth/login', data);
        return response.data.token;
    } catch (error) {
        if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
        else toast.error((error as Error).message);

        return null;
    }
};

export const register = async (data: RegisterData) => {
    try {
        const response = await http.post<User>('/auth/register', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            role: 'editor',
        });

        const token: string = response.headers['x-auth-token'];

        return token;
    } catch (error) {
        if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
        else toast.error((error as Error).message);

        return null;
    }
};



