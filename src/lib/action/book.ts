"use server"

import axios from "axios";
import { API_URL } from "../API";
type Genre = {
    id: string;
    title: string;
};



enum Language {
  English = "English",
  Japanese = "Japanese",
  Korean = "Korean",
}

enum BookStatus {
  Completed = "Completed",
  Drop = "Drop",
  Ongoing = "Ongoing",
}

interface Book {
    title: string;
    cover: string;
    description: string;
    author: string;
    genre: Genre[];
    status: BookStatus;
    realaseDate: number;
    language: Language;
}


export const bookList = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/book/list`,{
          headers: {
            'x-api-key': process.env.API_KEY,
          }
        }
        );
       

        return response.data.data;
    } catch (err) {
        console.log(" Error :", err);
        return null;
    }
}



export const bookSearch = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/book/list/`,{
          headers: {
            'x-api-key': process.env.API_KEY,
          }
        });

        return response.data.data || [];
    } catch (err) {
        console.log("❌ Error :", err);
        return { books: [], isLastPage: true };
    }
};




export const createBook = async (book: Book, accessToken: string) => {
    try {
        const bookResponse = await axios.post(`${API_URL}/api/book`, {
            title: book.title,
            cover: book.cover,
            description: book.description,
            author: book.author,
            status: book.status,
            realaseDate: book.realaseDate,
            language: book.language
        }, {
            headers: {
              'x-api-key': process.env.API_KEY,
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
                  'x-api-key': process.env.API_KEY,
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
        return bookResponse.data.data;
    } catch (err) {
      console.log(err)
        console.log(" Error :", err);
        return null;
    }
}


export const getBookDetail = async (id: string) => {
    try {

      console.log("id", id)
        const response = await axios.get(`${API_URL}/api/book/${id}`,{
          headers: {
            'x-api-key': process.env.API_KEY,
          }
        });
        return response.data.data;
    } catch (err) {
        console.log(" Error :", err);
        return null;
    }
}




type BookGenre = {
  bookId: string
  genreId: string
  Genre: {
    id: string
    title: string
  }
}
interface BookDetails {
  id: string
  title: string
  cover: string
  description: string
  author: string
  status: BookStatus
  language: Language
  realaseDate: number
  genre: BookGenre[]
}

export const updateBook = async (book:BookDetails , accessToken: string) => {
  try {

    const response = await axios.post(`${API_URL}/api/book/${book.id}`, {
        title: book.title,
        cover: book.cover,
        description: book.description,
        author: book.author,
        status: book.status,
        realaseDate: Number(book.realaseDate),
        language: book.language
    }, {
        headers: {
            'x-api-key': process.env.API_KEY,
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
           'x-api-key': process.env.API_KEY,
            Authorization: `Bearer ${accessToken}`,
        },
    })
;
    if (existingGenresResponse.status !== 200) {
      throw new Error(`Failed to fetch existing genres: ${existingGenresResponse.status}`);
    }

    const existingGenresData = existingGenresResponse.data.data;
    const existingGenres: string[] = existingGenresData.genre.map((g: { genreId: string }) => g.genreId);
    const newGenres = book.genre.filter((g: BookGenre) => !existingGenres.includes(g.genreId));
    const removedGenres = existingGenres.filter((g: string) => !book.genre.some(genre => genre.genreId === g));

    await Promise.all(
      newGenres.map(async (genre: BookGenre) => {
        const genreResponse = await axios.post(
          `${API_URL}/api/genre/book`,
          { bookId, genreId: genre.genreId },
          {
            headers: {
              'x-api-key': process.env.API_KEY,
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
          'x-api-key': process.env.API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (genreDeleteResponse.status !== 200) {
      throw new Error(`Failed to remove genre: ${genreDeleteResponse.status}`);
    }
  })
);
    return response.data.data;
  } catch (error) {
    console.error("Error updating book:", error);
    return null; 
  }
};


export const deleteBook = async (id: string, accessToken: string) => {
  try {
    const response = await axios.delete(`${API_URL}/api/book/${id}`, {
    headers:{
      'x-api-key': process.env.API_KEY,
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