"use server"

import axios from "axios"
import { API_URL } from "../API"
import { bookInterface } from "@/types/book"


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

        const dataFilter = result.data.data.map((data: { book: bookInterface }) => {
            return data.book
        })

        return dataFilter
    } catch (error) {
        console.log(error)
    }
}


// export const isBookmark = async (userId: string, bookId: string, accessToken: string) => {
//     try {
//         const result = await axios.get(`${API_URL}/api/bookmark/list/${userId}`, {
//             headers: {
//                 'x-api-key': process.env.API_KEY,
//                 Authorization: accessToken
//             }
//         })
//         const bookmarks = result.data.data
//         const matchedBookmark = bookmarks.find((bookmark: {
//             id: string;
//             bookId: string;
//             userId: string;
//         }) => bookmark.bookId === bookId && bookmark.userId === userId)
//         if(!matchedBookmark) {
//             return null
//         }
        
//         return {
//             id: matchedBookmark.id as string,
//             bookId: matchedBookmark.bookId ,
//             userId: matchedBookmark.userId,
//         }
//     } catch (error) {
//         console.log(error)
      
//     }
// }

export const isBookmark = async (userId: string, bookId: string, accessToken: string) => {
    try {
        const result = await axios.get(`${API_URL}/api/bookmark/isBookmarked/${userId}/${bookId}`, {
            headers: {
                'x-api-key': process.env.API_KEY,
                Authorization: accessToken
            }
        })
        
        return result.data.data
    } catch (error) {
        console.log(error)
    }
}