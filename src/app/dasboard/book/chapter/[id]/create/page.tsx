import CreateChapterForm from '@/components/book/createChapter'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function page() {
    let session  = await getServerSession(authOptions)
  
  return (
    <div>
      <CreateChapterForm accessToken={session?.backendTokens.accessToken as string}/>
    </div>
  )
}
