"use client"

import { useState, useEffect } from "react"
import { BookOpen, Edit, Trash2, Search, ArrowLeft, Plus } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { deleteChapter } from "@/lib/action/chapter"
import { useSession } from "next-auth/react"
import { bookInterface, Chapter } from "@/types/book"


type Props = {
  book: bookInterface;
  chapters: Chapter[];
}

export default function ChapterManagement({ book, chapters }: Props) {
  const { data: session } = useSession()
  const accessToken = session?.backendTokens?.accessToken as string | undefined
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>(chapters)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [chapterToDelete, setChapterToDelete] = useState<string | null>(null)
  useEffect(() => {
    const results = chapters.filter((chapter) =>
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chapter.description && chapter.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredChapters(results)
  }, [searchTerm, chapters])

  const handleEditChapter = (chapterId: string) => {
    router.push(`/dashboard/book/chapter/${book.id}/edit/${chapterId}`)
  }

  const confirmDelete = (chapterId: string) => {
    setChapterToDelete(chapterId)
    setShowConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (!chapterToDelete || !accessToken) return
    try {
      const res = await deleteChapter(chapterToDelete, accessToken)
      if (res === 200) {
        setFilteredChapters((prev) => prev.filter((chapter) => chapter.id !== chapterToDelete))
      }
    } catch (error) {
      console.error("Failed to delete chapter:", error)
    }
    setShowConfirmation(false)
    setChapterToDelete(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 relative">
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this chapter?</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 bg-gray-700 rounded-md">Cancel</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 rounded-md">Delete</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="flex items-center text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2" size={20} /> Back to Books
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <BookOpen className="mr-3" size={28} /> {book?.title} - Chapters
        </h1>
        <p className="text-gray-400">{book?.description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link href={`/dashboard/book/chapter/${book.id}/create`} className="inline-flex items-center px-4 py-2 bg-violet-600 rounded-md text-white">
          <Plus className="mr-2 h-5 w-5" /> Add New Chapter
        </Link>
        <div className="relative flex-grow max-w-md">
          <input type="text" placeholder="Search chapters..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-md" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {filteredChapters.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredChapters.map((chapter) => (
            <div key={chapter.id} className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
              <div className="flex justify-between">
                <button title="edite" onClick={() => handleEditChapter(chapter.id)} className="p-2 bg-blue-600 rounded">
                  <Edit size={16} />
                </button>
                <button title="edite" onClick={() => confirmDelete(chapter.id)} className="p-2 bg-red-600 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8">No Chapters Found</div>
      )}
    </div>
  )
}