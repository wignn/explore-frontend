import type React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getProfile } from "@/lib/action/user"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Sidebar } from "@/components/Sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null
  const session = await getServerSession(authOptions)

  try {
    if (session?.id && session?.backendTokens?.accessToken) {
      const profile = await getProfile(session.id, session.backendTokens.accessToken)
      user = profile !== "unauthorized" ? profile : null
    }
  } catch (error) {
    console.error("❌ Error in DashboardLayout:", error)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar user={user} />
      <div className="flex-1 flex">
        <aside className="w-64 bg-gray-900 border-r border-gray-800/40">
          <Sidebar />
        </aside>
        <main className="flex-1 bg-gray-950 border border-gray-800/40 rounded-lg m-1">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

