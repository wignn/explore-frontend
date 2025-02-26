
"use client"

import { bookList, getBookDetail } from "@/lib/action/book"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import NovelDetails from "@/components/book/NovelDetails"
import { useSession } from "next-auth/react"
import { getProfile } from "@/lib/action/user"
import type { NavbarProps } from "@/types/user"
import SkeletonNavbar from "@/components/loading/skletonNavbar"
import SkeletonNovelDetails from "@/components/loading/sekletonDetails"
import { isBookmark } from "@/lib/action/bookmark"

type Genre = {
  Genre: {
    id: string
    title: string
  }
}

type Chapter = {
  id: string
  title: string
  content: string
  updatedAt: string
  description: string
}

interface BookProps {
  id: string
  title: string
  cover: string
  description: string
  author: string
  updatedAt: string
  popular: boolean
  genre: Genre[]
  Chapter: Chapter[]
  createdAt: string
}

interface PopularProps {
  id: string
  title: string
  cover: string
  description: string
  author: string
  updatedAt: string
  popular: boolean
  genre: {
    id: string
    title: string
  }[]
  Chapter: Chapter[]
  createdAt: string
  bookmark: boolean
}

function Page() {
  const [book, setBook] = useState<BookProps | null>(null)
  const pathname = usePathname()
  const bookName = pathname.split("/")[2].replaceAll("-", " ")
  const [user, setUser] = useState<NavbarProps["user"] | undefined>(undefined)
  const [popular, setPopular] = useState<PopularProps[]>([])
  const [isBooksLoading, setIsBooksLoading] = useState(true)
  const [bookmark, setBookmark] = useState<any>()
  const session = useSession()

  useEffect(() => {
    if (!session?.data?.user) {
      console.warn("Session belum tersedia!")
      return
    }

    console.log("Fetching data dengan session:", session.data)

    const fetchData = async () => {
      try {
        const { id, backendTokens } = session.data
        const token = backendTokens?.accessToken

        const [userData, bookData, bookListData] = await Promise.all([
          id && token ? getProfile(id, token) : null,
          getBookDetail(bookName),
          bookList() || [],
        ])

        const bookmark = await isBookmark(id, bookData.id, token)
        setBookmark(bookmark)
        setUser(userData)
        setBook(bookData)

        if (bookListData?.length) {
          const sortedBooks = bookListData
            .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 5)
          setPopular(sortedBooks)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsBooksLoading(false)
      }
    }

    fetchData()
  }, [bookName, session?.data])

  return (
    <div className="bg-gray-900 min-h-screen">
      {isBooksLoading ? <SkeletonNavbar /> : <Navbar user={user} />}
      <div className="w-full">
        {isBooksLoading ? (
          <SkeletonNovelDetails />
        ) : (
          book &&
          user &&
          session.data?.backendTokens?.accessToken && (
            <NovelDetails
              book={book}
              Popular={popular}
              userId={session.data.id}
              accessToken={session.data.backendTokens.accessToken}
              Bookmark={bookmark}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Page

