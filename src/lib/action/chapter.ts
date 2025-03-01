"use server"

import axios from "axios"
import { API_URL } from "../API"

type Chapter = {
    title : string,
    bookId : string,
    content : string,
    description : string
}


export const createChapter = async (chapter: Chapter, accessToken: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/chapter`, chapter, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

    
        return response.data.data
    } catch (error) {
        console.error("Error creating chapter:", error)
        return null
    }
}

export const getChapters = async (bookId: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/chapter/${bookId}`, {
        });

        return response.data.data
    } catch (error) {
        console.error("Error fetching chapters:", error)
        return []
    }

}

export const deleteChapter = async (chapterId: string, accessToken: string) => {
    try {
        const response = await axios.delete(`${API_URL}/api/chapter/${chapterId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.status
    } catch (error) {
        console.error("Error deleting chapter:", error)
        return null
    }
}