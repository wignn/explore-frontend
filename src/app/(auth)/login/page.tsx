import LoginForm from '@/components/LoginForm'
import React from 'react'

function page() {
  return (
    <div>
        <LoginForm/>
    </div>
  )
}

export default page

export function generateMetadata() {
  return {
    title: "Login",
  };
}