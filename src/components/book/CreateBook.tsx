"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { createBook } from "@/lib/action/book"
import { useEdgeStore } from "@/lib/edgeStore"
import { ImagePlus, Loader2 } from "lucide-react"

const Select = dynamic(() => import("react-select"), { ssr: false })

type Genre = {
  id: string
  title: string
}

interface Book {
  title: string
  cover: string
  description: string
  author: string
  status: BookStatus
  language: Language
  genre: Genre[]
  realaseDate: number
}

interface CreateBookProps {
  accessToken: any
  genre: Genre[]
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

const CreateBook: React.FC<CreateBookProps> = ({ accessToken, genre }) => {
  const [formData, setFormData] = useState<Book>({
    title: "",
    cover: "",
    description: "",
    author: "",
    status:  BookStatus.Ongoing,
    language: Language.Korean,
    genre: [],
    realaseDate: 2024,
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { edgestore } = useEdgeStore()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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
    const genres = selectedGenres.map((genre: any) => ({
      id: genre.value,
      title: genre.label,
    }))
    setFormData((prevState) => ({
      ...prevState,
      genre: genres,
    }))
  }
  const statusOptions = Object.values(BookStatus).map((status) => ({ value: status, label: status }))
  const languageOptions = Object.values(Language).map((language) => ({ value: language, label: language }))

  const handleStatusChange = (selectedStatus: any) => {
    setFormData((prevState) => ({
      ...prevState,
      status: selectedStatus.value,
    }))
  }

  const handleLanguageChange = (selectedLanguage: any) => {
    setFormData((prevState) => ({
      ...prevState,
      language: selectedLanguage.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (file) {
        const uploadedImage = await edgestore.myPublicImage.upload({ file })
        const res =await createBook({ ...formData, cover: uploadedImage.url }, accessToken)
        if (res !== null) {
          setSuccess("Book created successfully!")
          setFormData({
            title: "",
            cover: "",
            description: "",
            author: "",
            genre: [],
            status: BookStatus.Ongoing,
            language: Language.Korean,
            realaseDate: 0,
          })
          setPreview("")
          setError("")
          setSuccess("success creating book")
        }else {     
          setError("Failed to create book")
          throw new Error("Failed to create book")
     
        }
      } else {
        return 
      }
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bbackdrop-blur-sm bg-gradient-to-b max-w-lg mx-auto md:my-8 rounded-2xl border border-gray-800 from-gray-900/90 to-black/90 md:rounded-lg shadow-lg p-6">
     <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Add 
          </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange(e, "title")}
            placeholder="Enter book title"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl 
                         text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                         transition-all duration-300 ease-in-out"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Cover Image</label>
          <div className="flex flex-col items-center gap-4">
            {preview && (
              <div className="relative w-40 h-56 rounded-lg overflow-hidden">
                <Image src={preview || "/placeholder.svg"} alt="Book cover preview" fill className="object-cover" />
              </div>
            )}
            <div className="w-full">
              <label
                className="flex flex-col items-center justify-center w-full h-32 
                              border-2 border-dashed border-gray-300 dark:border-gray-600 
                              rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className="w-8 h-8 mb-2 text-gray-500 bg-gray-900/50 border border-gray-700  dark:text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload book cover</p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange(e, "description")}
            placeholder="Enter book description"
            rows={3}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 text-white dark:border-gray-600 rounded-md 
                      dark:bg-gray-700 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                         transition-all duration-300 ease-in-out"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => handleChange(e, "author")}
            placeholder="Enter author's name"
            className="w-full px-3 py-2 dark:border-gray-600 rounded-md 
                     bg-gray-900/50 border border-gray-700 dark:bg-gray-700 text-white dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                         transition-all duration-300 ease-in-out"
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Genre</label>
          <Select
            options={genre.map((g) => ({ value: g.id, label: g.title }))}
            isMulti
            onChange={handleGenreChange}
            placeholder="Select genres"
            className="w-full text-black  bg-gray-900/50 border border-gray-700"
            classNamePrefix="select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3b82f6",
                primary75: "#60a5fa",
                primary50: "#93c5fd",
                primary25: "#dbeafe",
                danger: "#ef4444",
                dangerLight: "#fca5a5",
                neutral0: "#ffffff",
                neutral5: "#f9fafb",
                neutral10: "#f3f4f6",
                neutral20: "#e5e7eb",
                neutral30: "#d1d5db",
                neutral40: "#9ca3af",
                neutral50: "#6b7280",
                neutral60: "#4b5563",
                neutral70: "#374151",
                neutral80: "#1f2937",
                neutral90: "#111827",
              },
            })}
          />
          </div>
        {success && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Success!</span> {success}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </div>
          ) : (
            "Create Book"
          )}
        </button>
      </form>
    </div>
  )
}

export default CreateBook

