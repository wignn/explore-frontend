import Footer from '@/components/Footer';
import List from '@/components/List'
import Navbar from '@/components/Navbar';
import { getBookmarkById } from '@/lib/action/bookmark';
import { getProfile } from '@/lib/action/user';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

async function page() {
  let user, books;
  const session = await getServerSession(authOptions);
  try {   
    if (session?.id && session?.backendTokens?.accessToken) {
      user = await getProfile(session.id, session.backendTokens.accessToken);
      books =  await getBookmarkById(session.id, session.backendTokens.accessToken) || []
      
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div >
        <Navbar user={user}/>
        <List books={books} text="Bookmark" />
        <Footer/>
    </div>
  );
}

export default page;
