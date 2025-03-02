import UpdateBook from '@/components/UpdateBook'
import { getBookDetail } from '@/lib/action/book';
import { getGenre } from '@/lib/action/genre';
import { authOptions } from '@/lib/auth';
import { Book } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react'

type Genre = {
  id: string
  title: string
}


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

type BookGenre = {
  bookId: string
  genreId: string
  Genre: {
    id: string
    title: string
  }
}
interface Book {
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


const page = async ({ params }: { params: { id: string } }) => {
  let genre: Genre[] = [];
  let book: Book | null = null;
  // @ts-ignore
  const {id} = await params


  const session = await getServerSession(authOptions);
  try {
    book = await getBookDetail(id);
    genre = await getGenre();
  } catch (error) {
    console.log("Error fetching book detail", error);
  }
  return (
    <div>
      {book && (
        <UpdateBook genres={genre} book={book} accessToken={session?.backendTokens.accessToken as string} />
      )} 
    </div>
  )
}

export default page
