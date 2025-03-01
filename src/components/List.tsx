"use client"

import { timeAgo } from "@/lib/DateToHour"
import { Book } from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/loading/skletonBook"
import { bookInterface } from "@/types/book"
import Link from "next/link"
import { normalizeTitle } from "../lib/utils"

interface ListProps {
  books: bookInterface[]
}

function List({ books, text }: { books: ListProps["books"]; text: string }) {
  return (
    <div className="min-h-screen w-full bg-gray-900 p-6 md:p-10">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-teal-400">{text}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.length > 0 ? (
          books.map((book, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={book.id}
              className="group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-sm transition-all hover:shadow-lg hover:shadow-teal-500/10"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
              <Link href={`/view/${normalizeTitle(book.title)}`} className="flex flex-col gap-2">
  <h2 className="line-clamp-2 font-medium text-gray-200 group-hover:text-teal-300">{book.title}</h2>
</Link>
<div className="flex items-center gap-2 text-xs text-gray-400">
  <Book className="h-3 w-3" />
  <span>
    {/* <Link href={`/read/${book.title.replaceAll(" ", "-")}/${book?.chapter[book?.chapter?.length - 1]?.id}`} className="hover:text-teal-300">
      Chapter {book.chapter.length}
    </Link> */}
  </span>
</div>
<p className="text-xs text-gray-500">{timeAgo(book.updatedAt)}</p>

              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-400">
            <Book className="mx-auto mb-3 h-10 w-10 opacity-20" />
            <p>Tidak ada buku yang tersedia</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function BookListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
          <Skeleton className="aspect-[3/4] bg-gray-700" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-full bg-gray-700" />
            <Skeleton className="h-3 w-1/2 bg-gray-700" />
            <Skeleton className="h-3 w-1/3 bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default List

