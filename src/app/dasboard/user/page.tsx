import React from 'react'
import UserManagement from '@/components/admin/AdminUserList'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { apiRequest } from '@/lib/Request';
import { UserInterface } from '@/types/user';
async function page() {
    let user = [] as UserInterface[];
    const session = await getServerSession(authOptions)
    try {
        const accessToken = session?.backendTokens.accessToken as string
      const userRes = await apiRequest<{ data: UserInterface[] }>({
        endpoint: '/admin/user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })


      user = userRes.data
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