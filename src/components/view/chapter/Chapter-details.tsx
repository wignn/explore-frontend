"use client"

import { formatDate } from "@/lib/dateFormat"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { ChevronDown, Clock, FileText, List, SortAsc, SortDesc } from "lucide-react"

type Chapter = {
  id: string
  title: string
  updatedAt: string
  description: string
  chapterNum: number
}

interface ChapterListProps {
  chapters: Chapter[]
  bookTitle: string
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, bookTitle }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isExpanded, setIsExpanded] = useState(false)
  const sortedChapters = [...chapters].sort((a, b) => {
    return sortOrder === "asc" ? a.chapterNum - b.chapterNum : b.chapterNum - a.chapterNum
  })

  const displayedChapters = isExpanded ? sortedChapters : sortedChapters.slice(0, 5)

  const hasMoreChapters = chapters.length > 5

  const latestChapter = [...chapters].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )[0]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Chapters
        </h2>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="flex items-center gap-1 text-sm bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-md transition-colors"
        >
          <List className="w-4 h-4" />
          {sortOrder === "asc" ? (
            <>
              Oldest First <SortAsc className="w-3 h-3 ml-1" />
            </>
          ) : (
            <>
              Newest First <SortDesc className="w-3 h-3 ml-1" />
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {displayedChapters.map((chapter) => {
          const isLatest = latestChapter?.id === chapter.id
          const isNew = new Date(chapter.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

          return (
            <Link href={`/view/${bookTitle.replaceAll(" ", "-")}/${chapter.id}`} key={chapter.id} className="block">
              <div className="bg-zinc-800/40 hover:bg-zinc-800 rounded-lg p-4 transition-all duration-200 hover:shadow-lg border border-zinc-800 hover:border-zinc-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg text-white font-bold shrink-0">
                      {chapter.chapterNum}
                    </div>
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {chapter.title}
                        {isLatest && (
                          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Latest</span>
                        )}
                        {isNew && !isLatest && (
                          <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                        )}
                      </div>
                      <div className="text-sm text-zinc-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {formatDate(chapter.updatedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-sm bg-zinc-700/50 hover:bg-purple-600 text-white px-3 py-1 rounded-md transition-colors inline-block mt-2 sm:mt-0">
                      Read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {hasMoreChapters && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 flex items-center justify-center gap-2 text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          {isExpanded ? "Show Less" : `Show All Chapters (${chapters.length})`}
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  )
}

export default ChapterList

