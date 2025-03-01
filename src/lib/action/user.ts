"use server";
import axios from "axios";
import { API_URL } from "../API";
import { redirect } from "next/navigation";


export const getProfile = async (id: string, accessToken: string) => {
    try {
        if (!accessToken || !id) {
            console.error("Access token or ID is missing");
            return null;
        }

        const response = await axios.get(`${API_URL}/api/user/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200 || !response.data) {
            console.error("Error getting profile:", response);
            return redirect("/logout");
        }

        return response.data.data;
    } catch (err: any) {
        console.error("Error getting profile:", err);
        return null;
    }
};

interface ProfileData {
    name?: string;
    
    profilePic?: string
}

export const updateProfile = async (data: ProfileData, userId: string, accessToken: string) => {
    try {
        const response = await axios.put(`${API_URL}/api/user/${userId}`, data, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (response.status !== 200) {
            console.error("Error updating profile:", response);
            return null;
        }
        return response.data.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        return null;
    }
}