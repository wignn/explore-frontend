import About from '@/components/About'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { authOptions } from '@/lib/auth';
import { apiRequest } from '@/lib/Request';
import { UserInterface } from '@/types/user';
import { getServerSession } from 'next-auth';
import React from 'react'

async function page() {
  let user;
  try {
    const session = await getServerSession(authOptions);
    if (session?.id && session?.backendTokens?.accessToken) {

      const resUser =await apiRequest<{ data:  UserInterface  }>({
        endpoint: `/user/${session.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
      })
      user = resUser?.data;
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