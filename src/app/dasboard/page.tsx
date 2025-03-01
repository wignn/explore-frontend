import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Dashboard from "../../components/admin/AdminDasboard"
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

