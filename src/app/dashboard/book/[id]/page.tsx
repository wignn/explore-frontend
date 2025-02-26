import UpdateBook from '@/components/UpdateBook'
import { getGenre } from '@/lib/action/genre';
import { getProfile } from '@/lib/action/user';
import { authOptions } from '@/lib/auth';
import { UserInterface } from '@/types/user';
import { getServerSession } from 'next-auth';
import React from 'react'


const page =async () => {
let genre: any;
let user: UserInterface | null = null;

const session = await getServerSession(authOptions);
try {
   
    genre = await getGenre();
    if (session?.id && session?.backendTokens?.accessToken) {
        user = await getProfile(session.id, session.backendTokens.accessToken);
    }
} catch (error) {
    
}    
return (

<div>
      <UpdateBook genres={genre} accessToken={session?.backendTokens.accessToken as string}/>
    </div>
  )
}

export default page
