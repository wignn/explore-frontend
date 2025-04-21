import AdminGenreList from '@/components/admin/GenreAdmin'
import { authOptions } from '@/lib/auth'
import { apiRequest } from '@/lib/Request'
import { getServerSession } from 'next-auth'
import React from 'react'
interface GenreInterface {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}
const page = async () => {
    const session = await getServerSession(authOptions)
    let genre: GenreInterface[] = []
    try {
        const genreRes = await apiRequest<{data: GenreInterface[]}>({
            endpoint: '/genre',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            }
        })
        genre = genreRes.data
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
