"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import { updateBook, getBookDetail } from "@/lib/action/book"
import { useEdgeStore } from "@/lib/edgeStore"
import { ImagePlus, Loader2, BookOpen, User, AlignLeft, Tag } from "lucide-react"

const Select = dynamic(() => import("react-select"), { ssr: false })

type Genre = {
  id: string
  title: string
}

type BookGenre = {
  bookId: string
  genreId: string
  Genre: {
    id: string
    title: string
  }
}

interface Book {
  id: string
  title: string
  cover: string
  description: string
  author: string
  genre: BookGenre[]
}

interface UpdateBookProps {
  accessToken: string
  genres: Genre[]
}

const UpdateBook: React.FC<UpdateBookProps> = ({ accessToken, genres }) => {
  const params = useParams()
  const bookId = params.id as string

  const [formData, setFormData] = useState<Book>({
    id: "",
    title: "",
    cover: "",
    description: "",
    author: "",
    genre: [],
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const { edgestore } = useEdgeStore()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchBook = async () => {
      setIsDataLoading(true)
      try {
        const book = await getBookDetail(bookId)
        setFormData(book)
        setPreview(book.cover)
      } catch (error) {
        console.error("Error fetching book:", error)
        setError("Failed to fetch book data")
      } finally {
        setIsDataLoading(false)
      }
    }

    if (bookId) {
      fetchBook()
    }
  }, [bookId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Book) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenreChange = (selectedGenres: any) => {
    const newGenres = selectedGenres.map((genre: any) => ({
      bookId: bookId,
      genreId: genre.value,
      Genre: {
        id: genre.value,
        title: genre.label,
      },
    }))
    setFormData((prevState) => ({
      ...prevState,
      genre: newGenres,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      let coverUrl = formData.cover

      if (file) {
        const uploadedImage = await edgestore.myPublicImage.upload({ file })
        coverUrl = uploadedImage.url

        if (formData.cover) {
          await edgestore.myPublicImage.delete({ url: formData.cover })
        }
      }

      const updatedBook = {
        ...formData,
        cover: coverUrl,
        genre: formData.genre.map((g) => g.genreId),
      }

      const res = await updateBook(updatedBook, accessToken)
      if (res === 200) {
        setSuccess("Book updated successfully!")
      } else {
        throw new Error("Failed to update book")
      }
    } catch (error) {
      console.error("Error updating book:", error)
      setError("Failed to update book")
    } finally {
      setIsLoading(false)
    }
  }

  if (isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
            <div className="h-40 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Update Book</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <BookOpen className="inline-block mr-2" size={18} />
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange(e, "title")}
                placeholder="Enter book title"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-gray-700">
                  {preview ? (
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt="Book cover preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ImagePlus size={24} />
                    </div>
                  )}
                </div>
                <label className="flex-1 cursor-pointer">
                  <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition duration-300">
                    Choose new cover
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <AlignLeft className="inline-block mr-2" size={18} />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange(e, "description")}
                placeholder="Enter book description"
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="inline-block mr-2" size={18} />
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleChange(e, "author")}
                placeholder="Enter author's name"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Tag className="inline-block mr-2" size={18} />
                Genre
              </label>
              <Select
                options={genres.map((g) => ({ value: g.id, label: g.title }))}
                isMulti
                value={formData.genre.map((g) => ({ value: g.Genre.id, label: g.Genre.title }))}
                onChange={handleGenreChange}
                placeholder="Select genres"
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#374151",
                    borderColor: "#4B5563",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#374151",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? "#4B5563" : "#374151",
                    color: "#F3F4F6",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#4B5563",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#F3F4F6",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "#F3F4F6",
                    ":hover": {
                      backgroundColor: "#6B7280",
                      color: "#F3F4F6",
                    },
                  }),
                }}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500 text-white rounded-md text-sm" role="alert">
                <span className="font-bold">Error!</span> {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500 text-white rounded-md text-sm" role="alert">
                <span className="font-bold">Success!</span> {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Book"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateBook

