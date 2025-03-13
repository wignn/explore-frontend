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
  chapterNum: number
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
  bookMark:[]
  createdAt: string
  status: string
  realaseDate: number
  language: string
}


interface Bookmark {
  id: string
  bookId: string
  userId: string
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
}

function Page() {
  const [book, setBook] = useState<BookProps | null>(null)
  const pathname = usePathname()
  const bookName = pathname.split("/")[2].replaceAll("-", " ")
  const [user, setUser] = useState<NavbarProps["user"] | undefined>(undefined)
  const [popular, setPopular] = useState<PopularProps[]>([])
  const [isBooksLoading, setIsBooksLoading] = useState(true)
  const [bookmark, setBookmark] = useState<Bookmark | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user) {
      console.warn("Session belum tersedia!")
      return
    }

    const fetchData = async () => {
      try {
        const { id, backendTokens } = session
        const token = backendTokens?.accessToken

        const [userData, bookData, bookListData] = await Promise.all([
          id && token ? getProfile(id, token) : null,
          getBookDetail(bookName),
          bookList({page: 1, limit:12, status:"Ongoing"}) || [],
        ])

        if (bookData?.id) {
          const bookmarkData = await isBookmark(id, bookData.id, token)
          setBookmark(bookmarkData as Bookmark)
        }

        setUser(userData)
        setBook(bookData)

        if (bookListData?.books.length) {
          const sortedBooks: PopularProps[] = bookListData.books
            .sort(
              (a: PopularProps, b: PopularProps) =>
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
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
  }, [bookName, session])

  return (
    <div className="bg-gray-900 min-h-screen">
      {isBooksLoading ? <SkeletonNavbar /> : <Navbar user={user} />}
      <div className="w-full">
        {isBooksLoading ? (
          <SkeletonNovelDetails />
        ) : (
          book &&
          user &&
          session?.backendTokens?.accessToken && (
            <NovelDetails
              book={book}
              Popular={popular}
              userId={session.id}
              accessToken={session.backendTokens.accessToken}
              Bookmark={bookmark || { id: "", bookId: "", userId: "" }}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Page
