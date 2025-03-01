import React from 'react'
import UserManagement from '@/components/admin/AdminUserList'
import { users } from '@/lib/action/admin';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
async function page() {
    let user;
    const session = await getServerSession(authOptions)
    try {
        const accessToken = session?.backendTokens.accessToken as string
        user = await users(accessToken)

    } catch (error) {
        console.log("Error in AdminPage:", error)
    }
  return (
    <div>
        <UserManagement users={user}/>
    </div>
  )
}

export default page