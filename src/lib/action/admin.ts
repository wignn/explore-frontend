"use server"
import axios from "axios"
import { API_URL } from "../API"

export const userSessions = async (accessToken: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/user/session`, {
            headers: { 
            'x-api-key': process.env.API_KEY,
            Authorization: `Bearer ${accessToken}` },
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
            headers: {
                'x-api-key': process.env.API_KEY, 
                Authorization: `Bearer ${accessToken}` },
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
            headers: {
                'x-api-key': process.env.API_KEY,
                Authorization: `Bearer ${accessToken}` },
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
            headers: { 
                'x-api-key': process.env.API_KEY,
                Authorization: `Bearer ${accessToken}` },
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
            headers: {
                'x-api-key': process.env.API_KEY,
                Authorization: `Bearer ${accessToken}` },
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
            headers: { 
                'x-api-key': process.env.API_KEY,
                Authorization: `Bearer ${accessToken}` },
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching books:", error)
        return []
    }
}