
"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import { updateBook } from "@/lib/action/book"
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
enum Language {
  English = "English",
  Japanese = "Japanese",
  Korean = "Korean",
}

enum BookStatus {
  Completed = "Completed",
  Drop = "Drop",
  Ongoing = "Ongoing",
}
interface Book {
  id: string
  title: string
  cover: string
  description: string
  author: string
  status: BookStatus
  language: Language
  realaseDate: number
  genre: BookGenre[]
}

interface UpdateBookProps {
  accessToken: string
  genres: Genre[]
  book: Book
}

const UpdateBook: React.FC<UpdateBookProps> = ({ accessToken, genres,book }) => {
  const pathname = usePathname()
  const bookId = useMemo(() => pathname.split("/")[3],[pathname])
  const [formData, setFormData] = useState<Book>({
    id: "",
    title: "",
    cover: "",
    description: "",
    author: "",
    genre: [],
    status: BookStatus.Ongoing,
    language: Language.English,
    realaseDate: 0,

  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const {edgestore } = useEdgeStore()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  useEffect(() => {
    if (book) {
      setFormData(book);
      setPreview(book.cover);
      setIsDataLoading(false);
    }
  }, [book]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Book) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }))
  }

  interface LanguageOption {
    value: Language;
    label: string;
  }

  const handleLanguageChange = (selectedLanguage: unknown) => {
    const option = selectedLanguage as LanguageOption;
    setFormData((prevState) => ({
      ...prevState,
      language: option?.value || Language.English,
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

  interface GenreOption {
    value: string;
    label: string;
  }

  const handleGenreChange = (newValue: unknown) => {
    const selectedGenres = newValue as GenreOption[];
    const newGenres: BookGenre[] = (selectedGenres || []).map((genre: GenreOption) => ({
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

  interface StatusOption {
    value: BookStatus;
    label: string;
  }

  const handleStatusChange = (newValue: unknown) => {
    const selectedStatus = newValue as StatusOption | null;
    setFormData((prevState) => ({
      ...prevState,
      status: selectedStatus?.value || BookStatus.Ongoing,
    }))
  }
  const statusOptions = Object.values(BookStatus).map((status) => ({ value: status, label: status }))
  const languageOptions = Object.values(Language).map((language) => ({ value: language, label: language }))


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
        genre: formData.genre.map((g) => ({
          bookId: bookId,
          genreId: g.genreId,
          Genre: {
            id: g.genreId,
            title: g.Genre.title
          }
        })),
      }

      const res = await updateBook(updatedBook, accessToken)
      if (res !== null) {
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
            <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
          <Select
            options={statusOptions}
            value={statusOptions.find((option) => option.value === formData.status)}
            onChange={handleStatusChange}
            placeholder="Select status"
            className="w-full text-black bg-gray-900/50 border border-gray-700"
            classNamePrefix="select"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Language</label>
          <Select
            options={languageOptions}
            value={languageOptions.find((option) => option.value === formData.language)}
            onChange={handleLanguageChange}
            placeholder="Select language"
            className="w-full text-black bg-gray-900/50 border border-gray-700"
            classNamePrefix="select"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">year of release</label>
          <input
            type="text"
            value={formData.realaseDate}
            onChange={(e) => handleChange(e, "realaseDate")}
            placeholder="published year"
            className="w-full px-3 py-2 dark:border-gray-600 rounded-md 
                     bg-gray-900/50 border border-gray-700 dark:bg-gray-700 text-white dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                         transition-all duration-300 ease-in-out"
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

