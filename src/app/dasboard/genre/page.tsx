import AdminGenreList from '@/components/admin/GenreAdmin'
import { getGenre } from '@/lib/action/genre'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)
    let genre 
    try {
        genre = await getGenre()
    } catch (error) {
        console.log(error)
    }
  return (
    <div>
      <AdminGenreList genres={genre} accessToken={session?.backendTokens.accessToken as string} />
    </div>
  )
}

export default page
