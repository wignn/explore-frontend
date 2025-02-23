"use client"
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'

function Logout() {
    useEffect(() => {
        signOut({
            redirect:true,
            callbackUrl: '/'
        })
    },[])
  return (
    <div className='flex flex-col items-center justify-center h-screen'>

    </div>
  )
}

export default Logout