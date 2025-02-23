
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AddGenreForm from '@/components/CreateGenreForm'
import { getProfile } from '@/lib/action/user'

async function CreateGenreForm() {
    let user = null    
    const session = await getServerSession(authOptions)
    try {
    
        if (session?.id && session?.backendTokens?.accessToken) {
            const profile = await getProfile(session.id, session.backendTokens.accessToken)
            user = profile !== 'unauthorized' ? profile : null
        }
    } catch (error) {
        console.error('❌ Error on CreateGenreForm:', error)
    }
    return (
    <div className='bg-slate-900 p-0  from-gray-900 via-gray-800 to-black '>
        <Navbar user={user}/>
        <AddGenreForm accessToken={session?.backendTokens.accessToken || ""} />
        <Footer/>
    </div>
  )
}

export default CreateGenreForm