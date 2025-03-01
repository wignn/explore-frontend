"use server"

import axios from "axios"
import { API_URL } from "../API"


export const createBookmark = async (userId:string, bookId: string, accessToken: string) => {
    try {
    const res = await axios.post(`${API_URL}/api/bookmark`, {
        userId,
        bookId
    }, {
        headers: {
            'x-api-key': process.env.API_KEY,
            Authorization: accessToken
        }
    })

    return res.status 
    } catch (error) {
        console.log(error)
    }
 
} 

export const getBookmarkList = async (accessToken: string) => {

}

export const deleteBookmark = async (id: string, accessToken?: string) => {
    try {
    const res = await axios.delete(`${API_URL}/api/bookmark/${id}`, {
        headers: {
            'x-api-key': process.env.API_KEY,
            Authorization: `Bearer ${accessToken}`
        }
    })

    return res.status
    } catch (error) {
        console.log(error)
    }
    

}


export const getBookmarkById= async (bookId: string, accessToken: string) => {
    try {
        const result = await axios.get(`${API_URL}/api/bookmark/list/${bookId}`, {

            headers: {
                'x-api-key': process.env.API_KEY,
                Authorization: `Bearer ${accessToken}`
            }
        })

        const dataFilter = result.data.data.map((data: any) => {
            return data.book
        })

        return dataFilter
    } catch (error) {
        console.log(error)
    }
}


export const isBookmark = async (userId: string, bookId: string, accessToken: string) => {
    try {
        const result = await axios.get(`${API_URL}/api/bookmark/list/${userId}`, {
            headers: {
                'x-api-key': process.env.API_KEY,
                Authorization: accessToken
            }
        })
        const bookmarks = result.data.data
        const matchedBookmark = bookmarks.find((bookmark: any) => 
            bookmark.bookId === bookId && bookmark.userId === userId
        )
        if(!matchedBookmark) {
            return null
        }
        
        return {
            id: matchedBookmark.id as string,
            bookId: matchedBookmark.bookId as string,
            userId: matchedBookmark.userId as string,
        }
    } catch (error) {
        console.log(error)
      
    }
}