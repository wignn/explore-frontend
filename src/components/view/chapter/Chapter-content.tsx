"use client"

import Link from "next/link"
import { formatDate } from "@/lib/dateFormat"
import { bookInterface } from "@/types/book"

type Chapter = {
  id: string
  title: string
  bookId: string
  description: string
  content: string
  chapterNum: number
  createdAt: string
  updatedAt: string
    Book:bookInterface
}



export default function ChapterPage({chapter}:{chapter:Chapter}) {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
  
      <div className="container mx-auto p-4 max-w-4xl">
      <div className="p-4">
        <div className="container mx-auto text-sm">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <span className="mx-1">·</span>
          <Link href={`/novel/${chapter.bookId}`} className="hover:text-gray-300">
            {chapter.Book.title}
          </Link>
         
        </div>
      </div>
        <div className="text-center my-8">
          <h1 className="text-xl md:text-3xl  font-bold mb-2">
            {chapter.Book.title} chapter {chapter.chapterNum}
          </h1>
          <h2 className="md:text-xl text-lg text-gray-300 mb-2">
             {chapter.title}
          </h2>
          <p className="text-sm text-gray-400">
            Posted by <span className="text-blue-400">wign</span>, Released on {formatDate(chapter.createdAt)}
          </p>
        </div>

        <div className="flex justify-center md:justify-between md:w-full md:h-full items-center my-6">
          <div className="flex space-x-2">
            <Link
              href={`/novel/${chapter.bookId}/chapter-${chapter.chapterNum - 1}`}
              className={`bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center ${chapter.chapterNum <= 1 ? "opacity-50 pointer-events-none" : ""}`}
            >
              ← Prev
            </Link>
            <Link
              href={`/novel/${chapter.bookId}/all-chapters`}
              className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-md flex items-center"
            >
              <span className="mr-2">☰</span> All Chapter
            </Link>
            <Link
              href={`/novel/${chapter.bookId}/chapter-${chapter.chapterNum + 1}`}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center"
            >
              Next →
            </Link>
          </div>
        </div>
        {/* <div className="flex justify-center  md:w-full md:h-full   space-x-2 my-6">
          <button className="bg-blue-600 md:text-lg text-sm hover:bg-blue-500 px-4 py-2 rounded-md flex items-center">
            <Facebook size={18}  className="mr-2" /> Facebook
          </button>
          <button className="bg-blue-400 md:text-lg text-sm hover:bg-blue-300 px-4 py-2 rounded-md flex items-center">
            <Twitter size={18} className="mr-2" /> Twitter
          </button>
          <button className="bg-green-600 md:text-lg text-sm hover:bg-green-500 px-4 py-2 rounded-md flex items-center">
            <Share2 size={18} className="mr-2" /> WhatsApp
          </button>
        </div> */}

        <div className="my-8">
          <h2 className="text-xl font-bold mb-6 select-none">
            {chapter.title}
          </h2>

          <div className=" chapter-content space-y-4 text-base md:text-lg" dangerouslySetInnerHTML={{ __html: chapter.content }} />
        </div>
      </div>
    </div>
  )
}

