"use server"

import axios from "axios";
import { API_URL } from "../API";
import { bookInterface } from "@/types/book";

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


export const bookList = async () => {
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
        const response = await axios.get(`${API_URL}/api/book/list`);
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




export const createBook = async (book: Book, accessToken: string) => {
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
            await axios.post(`${API_URL}/api/genre/book`, {
                bookId,
                genreId: getGenre.data.data.id
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }

        return bookResponse.status;
    } catch (err: any) {
        console.error(" Error :", err.response?.status, err.message);
        return null;
    }
}


export const getBookDetail = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/book/${id}`);
        return response.data.data;
    } catch (err: any) {
        console.error(" Error :", err.response?.status, err.message);
        return null;
    }
}

export const updateBook = async (book: any, accessToken: string) => {
  try {

    const response = await axios.post(`${API_URL}/api/book/${book.id}`, {
        title: book.title,
        cover: book.cover,
        description: book.description,
        author: book.author,
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (response.status !== 200) {
      throw new Error(`Failed to update book: ${response.status}`);
    }
    const responseData = response.data.data
    const bookId = responseData.id;
    const existingGenresResponse = await axios.get(`${API_URL}/api/book/${bookId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
;
    if (existingGenresResponse.status !== 200) {
      throw new Error(`Failed to fetch existing genres: ${existingGenresResponse.status}`);
    }

    const existingGenresData = existingGenresResponse.data.data;
    const existingGenres = existingGenresData.genre.map((g: any) => g.genreId);
    const newGenres = book.genre.filter((g: string) => !existingGenres.includes(g));
    const removedGenres = existingGenres.filter((g: string) => !book.genre.includes(g));

    await Promise.all(
      newGenres.map(async (genreId: string) => {
        const genreResponse = await axios.post(
          `${API_URL}/api/genre/book`,
          { bookId, genreId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (genreResponse.status !== 200) {
          throw new Error(`Failed to add genre: ${genreResponse.status}`);
        }
      })
    );
await Promise.all(
  removedGenres.map(async (genreId: string) => {
    const genreDeleteResponse = await axios.delete(
      `${API_URL}/api/genre/book/${genreId}/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (genreDeleteResponse.status !== 200) {
      throw new Error(`Failed to remove genre: ${genreDeleteResponse.status}`);
    }
  })
);
    return response.status;
  } catch (error) {
    console.error("Error updating book:", error);
    return null; 
  }
};


export const deleteBook = async (id: string, accessToken: string) => {
  try {
    const response = await axios.delete(`${API_URL}/api/book/${id}`, {
    headers:{
      Authorization: `Bearer ${accessToken}`,
    }
    })
    if (response.status !== 200) {
      throw new Error(`Failed to delete book: ${response.status}`);
    }
    return response.status
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}