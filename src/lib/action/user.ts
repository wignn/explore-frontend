"use server"
import axios from "axios";
import { API_URL } from "../API";



export const getProfile = async (id: string, accessToken: string) => {
    try {
        if(!accessToken || !id) {
            return null;
        }
        const response = await axios.get(`${API_URL}/api/user/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}` 
            }
        });

        return response.data.data;
    } catch (err: any) {
        console.error("Error getting profile:", err);
        if (err.response?.status === 401) {
            return err.status = "unauthorized";
        }

        return null;
    }
};