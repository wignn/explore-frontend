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
        console.error(" Error :", err);
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
        console.error("❌ Error :", err);
    }
};




export const createBook = async (book: Book, accessToken: string) => {
    try {
      console.log("book", book)   
       console.log("book", Number(book.realaseDate))
        const bookResponse = await axios.post(`${API_URL}/api/book`, {
            title: book.title,
            cover: book.cover,
            description: book.description,
            author: book.author,
            language: book.language,   
            realaseDate:Number(book.realaseDate),
            status: book.status,
        }, {
            headers: {
              'x-api-key': process.env.API_KEY,
                Authorization: `Bearer ${accessToken}`
            }
        });

        const bookId = bookResponse.data.data.id;

        for (const genre of book.genre) {
            const genreName = genre.title.toLowerCase();
            const getGenre = await axios.get(`${API_URL}/api/genre/${genreName}`,{
              headers: {
                'x-api-key': process.env.API_KEY,
              }
            })
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
    }
}


interface UpdateBook {
  id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  genre: string[];
  status: BookStatus;
  realaseDate: number;
  language: Language;
  
}



export const updateBook = async (book: UpdateBook , accessToken: string) => {
  try {
console.log("book", book)

    const response = await axios.post(`${API_URL}/api/book/${book.id}`, {
        title: book.title,
        cover: book.cover,
        description: book.description,
        author: book.author,
        status: book.status,
        realaseDate: Number(book.realaseDate),
        language: book.language,
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
    const existingGenres = existingGenresData.genre.map((g: {genreId: string}) => g.genreId);
    const newGenres = book.genre.filter((g: string) => !existingGenres.includes(g));
    const removedGenres = existingGenres.filter((g: string) => !book.genre.includes(g));

    await Promise.all(
      newGenres.map(async (genreId: string) => {
        const genreResponse = await axios.post(
          `${API_URL}/api/genre/book`,
          { bookId, genreId },
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
    console.log("Error updating book:", error);
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
    console.log("Error deleting book:", error);
  }
}