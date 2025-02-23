"use server"

import axios from "axios"
import { API_URL } from "../API"
import { useId } from "react"


export const createBookmark = async (userId:string, bookId: string, accessToken: string) => {
    try {
        console.log(userId, bookId, accessToken)
    const res = await axios.post(`${API_URL}/api/bookmark`, {
        userId,
        bookId
    }, {
        headers: {
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
        console.log(id, accessToken)
    const res = await axios.delete(`${API_URL}/api/bookmark/${id}`, {
        headers: {
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
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(result.data.data, "hitammmmmmmmmmmmmmmmmmmm")
        result.data.data
    } catch (error) {
        console.log(error)
    }
}


export const isBookmark = async (userId: string, bookId: string, accessToken: string) => {
    try {
        const result = await axios.get(`${API_URL}/api/bookmark/list/${userId}`, {
            headers: {
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
            id: matchedBookmark.id,
            bookId: matchedBookmark.bookId,
            userId: matchedBookmark.userId,
        }
    } catch (error) {
        console.log(error)
        return {
            bookmark: null,
            isBookmark: false,
            status: 500
        }
    }
}