import CreateChapterForm from '@/components/book/createChapter'
import { getProfile } from '@/lib/action/user';
import { authOptions } from '@/lib/auth';
import { UserInterface } from '@/types/user'
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function page() {
    let user: UserInterface;
    let session  = await getServerSession(authOptions)
    try {
        user = await getProfile(session?.id as string,session?.backendTokens.accessToken as string)
    } catch (error) {
        
    }
  return (
    <div>
      <CreateChapterForm/>
    </div>
  )
}
