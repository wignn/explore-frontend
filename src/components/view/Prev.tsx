"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PrevProps {
  pageParam: number
  isLastPage: boolean
  searchQuery: string
}

const Prev = ({ pageParam, isLastPage, searchQuery }: PrevProps) => {
  console.log(pageParam, isLastPage, searchQuery)
  const prevPage = pageParam > 1 ? pageParam - 1 : null
  const nextPage = !isLastPage ? pageParam + 1 : null

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {prevPage ? (
        <Link
          href={`/view?query=${searchQuery}&page=${prevPage}`}
          className="flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="flex cursor-not-allowed items-center gap-1 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-600 opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
      )}

      <span className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-3 text-sm font-medium text-white">
        {pageParam}
      </span>

      {nextPage ? (
        <Link
          href={`/view?query=${searchQuery}&page=${nextPage}`}
          className="flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <button
          disabled
          className="flex cursor-not-allowed items-center gap-1 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-600 opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default Prev

