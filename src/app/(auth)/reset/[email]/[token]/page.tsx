

import ResetPassword from '@/components/Reset-password'
import React from 'react'

async function page({params}: {params: Promise <{token: string, email: string}>}) {
  const {token}  =await params
  const {email} = await params
  return (
    <div>
      <ResetPassword token={token} email={email}/>
      </div>
  )
}

export default page

export function generateMetadata() {
  return {
    title: "Reset Password",
  };
}