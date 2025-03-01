"use server"

import axios from "axios"
import { API_URL } from "../API"


export const getGenre =async() =>{
    const res = await axios.get(`${API_URL}/api/genre`)
    return res.data.data
}


export const createGenre = async(title: string, description:string ,accessToken: string) => {
    try {
        const genreResponse = await axios.post(`${API_URL}/api/genre`, {
            title,
            description
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        return genreResponse.data.data ;
    } catch (error) {
        console.error("Error creating genre:", error);
        return null;
    }
}


export const deleteGenre = async(id: string, accessToken: string) => {
    try {
        const genreResponse = await axios.delete(`${API_URL}/api/genre/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return genreResponse.status;
    } catch (error) {
        console.error("Error deleting genre:", error);
        return null;
    }
}

export const updateGenre = async(id: string, title: string, description: string, accessToken: string) => {
    try {
        const genreResponse = await axios.put(`${API_URL}/api/genre/${id}`, {
            title,
            description
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return genreResponse.status;
    } catch (error) {
        console.error("Error updating genre:", error);
        return null;
    }
}