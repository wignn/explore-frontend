"use client"

import { formatDate } from "@/lib/dateFormat"
import Link from "next/link"
import type React from "react"

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
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Chapters</h2>
      <div className="overflow-hidden rounded-lg border border-zinc-800">
        <div className="grid grid-cols-[1fr,2fr,1fr] bg-zinc-800 text-white font-medium">
          <div className="p-4">Vol/Ch</div>
          <div className="p-4">Chapter Title</div>
          <div className="p-4">Release Date</div>
        </div>
        <div className="divide-y divide-zinc-800">
          {chapters.map((chapter, _) => (
              <Link
                href={`/view/${bookTitle.replaceAll(" ", "-")}/${chapter.id}`}
                key={chapter.id}
                className="grid grid-cols-[1fr,2fr,1fr] hover:bg-zinc-800/50 transition-colors"
              >
                <div className="p-4 text-zinc-300 font-bold">Ch. {chapter.chapterNum}</div>
                <div className="p-4 text-zinc-300">{chapter.title}</div>
                <div className="p-4 text-zinc-300">{formatDate(chapter.updatedAt)}</div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChapterList
