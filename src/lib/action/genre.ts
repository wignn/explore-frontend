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

        return genreResponse.status ;
    } catch (error) {
        console.error("Error creating genre:", error);
        return null;
    }
}