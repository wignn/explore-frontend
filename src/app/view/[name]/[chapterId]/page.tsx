import Navbar from '@/components/Navbar'
import ChapterPage from '@/components/view/chapter/Chapter-content'
import { getChapters } from '@/lib/action/chapter'
import { getProfile } from '@/lib/action/user'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'


export default async function page({params}:{params:{chapterId:string}}) {
  // @ts-ignore
  const {chapterId} = await params
  let chapter 
  let user = null
  try {
        chapter =await getChapters(chapterId)
        const session = await getServerSession(authOptions)
        if (session?.id && session?.backendTokens?.accessToken) {
            user = await getProfile(session.id, session.backendTokens.accessToken)
        }
    } catch (error) {
        console.error("Failed to load chapter:", error)
    }
    
  return (
    <div>
        <Navbar user={user}/>
      <ChapterPage chapter={chapter}/>
    </div>
  )
}
