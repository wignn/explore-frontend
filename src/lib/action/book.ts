"use server"
import axios from "axios";
import { API_URL } from "../API";
import exp from "constants";
import { bookInterface } from "@/types/book";

export const bookList = async ( ) => {
    try {
        const response = await axios.get(`${API_URL}/api/book/LIST`
        );
        
        return response.data.data;
    } catch (err: any) {
        console.error(" Error :", err.response?.status, err.message);
        return null;
    }
}



export const bookSearch = async (query: string, page: number, limit: number): Promise<bookInterface[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/book/LIST`);
        const allBooks: bookInterface[] = response.data.data;

        if (!Array.isArray(allBooks)) {
            console.error("❌ Data buku tidak valid:", allBooks);
            return [];
        }
        const filteredBooks = query
            ? allBooks.filter(book => book.title.toLowerCase().includes(query.toLowerCase()))
            : allBooks;

        const startIndex = (page - 1) * limit;
        const paginatedBooks = filteredBooks.slice(startIndex, startIndex + limit);

        return paginatedBooks;
    } catch (err: any) {
        console.error(" Error :", err.response?.status, err.message);
        return []; 
    }
};


type Genre = {
    id: string;
    title: string;
  };
interface Book {
    title: string;
    cover: string;
    description: string;
    author: string;
    genre: Genre[];
}

export const createBook = async(book: Book, accessToken: string) => {
        try {
            console.log(accessToken)
                const bookResponse = await axios.post(`${API_URL}/api/book`, {
                        title: book.title,
                        cover: book.cover,
                        description: book.description,
                        author: book.author
                }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}` 
                        }
                });

                const bookId = bookResponse.data.data.id;
    

                for (const genre of book.genre) {
                    const genreName = genre.title.toLowerCase();
                    const getGenre = await axios.get(`${API_URL}/api/genre/${genreName}`)
                   
                       const genreR = await axios.post(`${API_URL}/api/genre/book`,{
                            bookId,
                            genreId: getGenre.data.data.id
                        },{
                            headers:{
                                Authorization: `Bearer ${accessToken}`
                            }
                        });
                }

                return bookResponse.status;
        } catch (err:any) {
            console.error(" Error :", err.response?.status, err.message);
                return null;
        }
}


export const getBookDetail = async (id: string) => {
    try{
    const response = await axios.get(`${API_URL}/api/book/${id}`);
    console.log(response.data.data)
    return response.data.data;
    } catch (err: any) {
        console.error(" Error :", err.response?.status, err.message);
        return null;
    }
}