import ForgotPassword from '@/components/Forgot-password'
import React from 'react'

function page() {
  return (
    <div>
        <ForgotPassword/>
    </div>
  )
}

export default page

export function generateMetadata() {
  return {
    title: "Forgot Password",
  };
}