import UpdateBook from '@/components/UpdateBook'
import { getBookDetail } from '@/lib/action/book';
import { getGenre } from '@/lib/action/genre';
import { getProfile } from '@/lib/action/user';
import { authOptions } from '@/lib/auth';
import { UserInterface } from '@/types/user';
import { getServerSession } from 'next-auth';
import React from 'react'


const page =async ({params}: {params:{id:string}}) => {
let genre: any;
let user: UserInterface | null = null;
let book = null
const bookId = params.id ?? ""


const session = await getServerSession(authOptions);
try {
    book = await getBookDetail(bookId);
    genre = await getGenre();
    if (session?.id && session?.backendTokens?.accessToken) {
        user = await getProfile(session.id, session.backendTokens.accessToken);
    }
} catch (error) {
    
}    
return (

  <div>
      <UpdateBook genres={genre} book={book} accessToken={session?.backendTokens.accessToken as string}/>
    </div>
  )
}

export default page
