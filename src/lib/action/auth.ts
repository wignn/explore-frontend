"use server"
import axios from "axios";
import { API_URL } from "../API";

interface registerData {
    email: string;
    password: string;
    username: string;
}


export const register = async (data: registerData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, data);
        console.log("Response:", response);
        return response.data.data;
    } catch (err: any) {
        console.error(" Error :", err.response?.status, err.message);
        return null;
    }
}