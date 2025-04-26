import RegisterForm from '@/components/RegisterForm'
import React from 'react'

function page() {
  return (
    <div>
        <RegisterForm/>
    </div>
  )
}

export default page

export function generateMetadata() {
  return {
    title: "Register",
  };
}