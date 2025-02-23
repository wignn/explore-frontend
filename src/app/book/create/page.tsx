import CreateBook from '@/components/CreateBook'
import Navbar from '@/components/Navbar'
import React from 'react'
import { getServerSession } from "next-auth";
import {getProfile } from '@/lib/action/user'
import { authOptions } from '@/lib/auth';
import { getGenre } from '@/lib/action/genre';
import Footer from '@/components/Footer';

async function page() {
  let user, genre, err;    
  const session = await getServerSession(authOptions)
  try{
    if (!session) {
      throw new Error('Authentication required')
    }
    
     user = await getProfile(session.id, session.backendTokens.accessToken)
     genre = await getGenre()
    }catch(e:any){
      console.log(e.message)
      err = true
    }

    if(err){
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

  return (
    <div className="min-h-screen flex flex-col bg-[#222831] text-white">
      <Navbar user={user} />
      <main className=" ">
        <CreateBook accessToken={session?.backendTokens.accessToken} genre={genre} />
      </main>
      <Footer />
    </div>
  )

}


export default page