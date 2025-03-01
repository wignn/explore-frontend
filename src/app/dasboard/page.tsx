import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import axios from "axios"
import { authOptions } from "@/lib/auth"
import Dashboard from "../../components/admin/AdminDasboard"
import { API_URL } from "@/lib/API"
import { users, chapters, genres, userSessions, bookmarks, books } from "@/lib/action/admin"


export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  const accessToken = session?.backendTokens.accessToken as string

  const [userData, chapterData, genreData, sessionData, bookmarkData, bookData] = await Promise.all([
    users(accessToken),
    chapters(accessToken),
    genres(accessToken),
    userSessions(accessToken),
    bookmarks(accessToken),
    books(accessToken),
  ])

  return (
    <Dashboard
      userData={userData}
      chapterData={chapterData}
      genreData={genreData}
      sessionData={sessionData}
      bookmarkData={bookmarkData}
      bookData={bookData}
    />
  )
}

