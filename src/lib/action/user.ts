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

        // console.log("Access Token:", accessToken);
        // console.log("User ID:", id);

        const response = await axios.get(`${API_URL}/api/user/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200 || !response.data) {
            console.error("Error getting profile:", response);
            return redirect("/logout");
        }

        console.log("Response Status:", response.status);

        return response.data.data;
    } catch (err: any) {
        console.error("Error getting profile:", err);
        return null;
    }
};