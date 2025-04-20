"use client"

import Link from "next/link"
import { formatDate } from "@/lib/dateFormat"
import { normalizeTitle } from "@/lib/utils"
import Footer from "@/components/Footer"
import { bookInterface, Chapter } from "@/types/book"


export default function ChapterPage({ book, chapter }: { book: bookInterface, chapter: Chapter }) {
  const bookName = normalizeTitle(book.title)

  const sortedChapters = [...book.chapter].sort((a, b) => a.chapterNum - b.chapterNum)
  const prevChapter = sortedChapters.find(chap => chap.chapterNum === chapter.chapterNum - 1) || null
  const nextChapter = sortedChapters.find(chap => chap.chapterNum === chapter.chapterNum + 1) || null

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="p-4">
          <div className="container mx-auto text-sm">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <span className="mx-1">·</span>
            <Link href={`/view/${bookName}`} className="hover:text-gray-300">{book.title}</Link>
          </div>
        </div>

        <div className="text-center my-8">
          <h1 className="text-xl md:text-3xl font-bold mb-2">
            {book.title} - {chapter.title}
          </h1>
          <p className="text-sm text-gray-400">
            Posted by <span className="text-blue-400">{book.author}</span>, Released on {formatDate(chapter.createdAt)}
          </p>
        </div>
        <div className="flex justify-center md:justify-between  items-center my-6">
          <div className="flex space-x-2 md:gap-0 gap-14">
            <Link
              href={prevChapter ? `/view/${bookName}/${prevChapter.id}` : "#"}
              className={`bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center ${!prevChapter ? "opacity-50 pointer-events-none" : ""}`}
            >
              ← Prev
            </Link>

            <Link
              href={`/view/${bookName}`}
              className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-md flex items-center"
            >
              <span className="mr-2">☰</span>
            </Link>

            <Link
              href={nextChapter ? `/view/${bookName}/${nextChapter.id}` : "#"}
              className={`bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center ${!nextChapter ? "opacity-50 pointer-events-none" : ""}`}
            >
              Next →
            </Link>
          </div>
        </div>

        <div className="my-8">
          <h2 className="text-xl font-bold mb-6 select-none">
            {chapter.title}
          </h2>
          <div
            className="chapter-content space-y-4 text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
