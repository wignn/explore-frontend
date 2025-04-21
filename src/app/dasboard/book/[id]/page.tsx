import UpdateBook from '@/components/UpdateBook'
import { authOptions } from '@/lib/auth';
import { apiRequest } from '@/lib/Request';
import { bookInterface } from '@/types/book';
import { getServerSession } from 'next-auth';
import React from 'react'

type Genre = {
  id: string
  title: string
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  let genre: Genre[] = [];
  let book: bookInterface | null = null;
  const {id} = await params


  const session = await getServerSession(authOptions);
  try {

    const [bookRes, genreRes] = await Promise.all([
    apiRequest<{data: bookInterface}>({
      endpoint: `/book/${id}`,
      method: 'GET',
    }),
    apiRequest<{data: Genre[]}>({
      endpoint: '/genre',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    }),
  ])
  
  book = bookRes.data;
    genre = genreRes.data;
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
