"use client"

import { useState, useEffect } from "react"
import { Book, Edit, Trash2, Search } from "lucide-react"
import Link from "next/link"
import { bookInterface } from "@/types/book"
import { formatDate } from "@/lib/dateFormat"
import { useRouter } from "next/navigation"
import { deleteBook } from "@/lib/action/book"

interface Props {
    book: bookInterface[];
    accesToken: string;
}

export default function AdminBookList({ book, accesToken}:Props) {
  const [books, setBooks] = useState<bookInterface[]>(book)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBooks, setFilteredBooks] = useState<bookInterface[]>(books)
  const [succes, setSucces] = useState("")
  const [error, setError] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)
  const route = useRouter()
  
  useEffect(() => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.updatedAt.toString().includes(searchTerm),
    )
    setFilteredBooks(results)
  }, [searchTerm, books])

  const handleUpdate = (id: string) => {
    route.push(`/dashboard/book/${id}`)
    console.log(`Update book with id: ${id}`)
  }

  const confirmDelete = (id: string) => {
    setBookToDelete(id)
    setShowConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      setBooks(books.filter((book) => book.id !== bookToDelete))
      const res = await deleteBook(bookToDelete, accesToken)
      if (res === 200) {
        setSucces("Buku berhasil dihapus")
      } else {
        setError("Gagal menghapus buku")
        setSucces("")
      }
      setShowConfirmation(false)
      setBookToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
    setBookToDelete(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 relative">
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">Apakah Anda yakin ingin menghapus buku ini?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                Tidak
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
              >
                Yakin
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Book className="mr-2" />
        Book List 
      </h1>
      
      {succes && (
        <div className="mb-4 p-3 bg-green-600 bg-opacity-25 border border-green-600 rounded-md">
          {succes}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-600 bg-opacity-25 border border-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <Link 
        href="/dashboard/book/create" 
        className="inline-flex items-center mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium"
      >
        <Book className="mr-2 h-5 w-5" />
        Create New Book
      </Link>
      <div className="mb-6 relative"> 
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-100"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Published Year</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{formatDate(book.createdAt)}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdate(book.id)}
                    className="mr-2 p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                    aria-label="Update"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(book.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredBooks.length === 0 && (
        <p className="text-center mt-4 text-gray-400">No books found matching your search.</p>
      )}
    </div>
  )
}