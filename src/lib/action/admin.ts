"use server"
import axios from "axios"
import { API_URL } from "../API"

export const userSessions = async (accessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/user/session`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching user sessions:", error)
        return []
    }
}

export const users = async (accessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/user`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching users:", error)
        return []
    }
}

export const chapters = async (accessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/chapter`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching chapters:", error)
        return []
    }
}

export const genres = async (accessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/genre`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching genres:", error)
        return []
    }
}

export const bookmarks = async (accessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/bookmark`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching bookmarks:", error)
        return []
    }
}

export const books = async (accessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/book`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching books:", error)
        return []
    }
}