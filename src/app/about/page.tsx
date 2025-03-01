import About from '@/components/About'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getProfile } from '@/lib/action/user';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

async function page() {
  let user;
  try {
    const session = await getServerSession(authOptions);
    if (session?.id && session?.backendTokens?.accessToken) {
      user = await getProfile(session.id, session.backendTokens.accessToken);
    }
  } catch (error) {
    console.log("Error fetching user profile", error);
  }
  return (
    <div>
      <Navbar user={user}/>
      <About/>
      <Footer/>
    </div>
  )
}

export default page