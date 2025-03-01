"use client"

import { useState, useEffect } from "react"
import { Tag, Edit, Trash2, Search, Plus } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/dateFormat"
import { createGenre, updateGenre } from "@/lib/action/genre"

interface GenreInterface {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

interface Props {
  genres: GenreInterface[];
  accessToken: string;
}

export default function AdminGenreList({ genres, accessToken }: Props) {
  const [genreList, setGenreList] = useState<GenreInterface[]>(genres)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGenres, setFilteredGenres] = useState<GenreInterface[]>(genreList)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [genreToDelete, setGenreToDelete] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [newGenreName, setNewGenreName] = useState("")
  const [newGenreDescription, setNewGenreDescription] = useState("")
  const [editGenreId, setEditGenreId] = useState<string | null>(null)
  const [editGenreName, setEditGenreName] = useState("")
  const [editGenreDescription, setEditGenreDescription] = useState("")
  const router = useRouter()
  
  useEffect(() => {
    const results = genreList.filter(
      (genre) =>
        genre.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        genre.updatedAt.toString().includes(searchTerm)
    )
    setFilteredGenres(results)
  }, [searchTerm, genreList])

  const handleUpdate = (genre: GenreInterface) => {
    setEditGenreId(genre.id)
    setEditGenreName(genre.title)
    setEditGenreDescription(genre.description)
    setShowEditForm(true)
  }

  const confirmDelete = (id: string) => {
    setGenreToDelete(id)
    setShowConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    if (genreToDelete) {
      try {
        
        setSuccess("Genre berhasil dihapus")
        setTimeout(() => setSuccess(""), 3000)
      } catch (err) {
        setError("Gagal menghapus genre")
        setTimeout(() => setError(""), 3000)
      } finally {
        setShowConfirmation(false)
        setGenreToDelete(null)
      }
    }
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
    setGenreToDelete(null)
  }

  const handleAddGenre = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGenreName.trim()) {
      setError("Nama genre tidak boleh kosong")
      setTimeout(() => setError(""), 3000)
      return
    }
    

    try {

    const res = await createGenre(newGenreName , newGenreDescription, accessToken)

    if(res === null){
        setError("error create new genre")
        return
    }

    const newGenre: GenreInterface = {
        id: `genre-${Date.now()}`,
        title: newGenreName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: newGenreDescription
      }
    setGenreList([...genreList, newGenre])
    setNewGenreName("")
    setShowAddForm(false)
    setSuccess("Genre berhasil ditambahkan")
    setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Gagal menambahkan genre")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleEditGenre = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editGenreName.trim()) {
      setError("Nama genre tidak boleh kosong")
      setTimeout(() => setError(""), 3000)
      return
    }
    try {
        const res = await updateGenre(editGenreId as string, editGenreName, editGenreDescription, accessToken)
        if(res !== 200){
            setError("error update genre")
            return
        }
        setGenreList(
            genreList.map((genre) => 
              genre.id === editGenreId 
                ? { ...genre, title: editGenreName, description: editGenreDescription, updatedAt: new Date().toISOString() } 
                : genre
            )
          )
          
      
      setEditGenreId(null)
      setEditGenreName("")
      setShowEditForm(false)
      setSuccess("Genre berhasil diperbarui")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Gagal memperbarui genre")
      setTimeout(() => setError(""), 3000)
    }
  }



  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 relative">
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">Apakah Anda yakin ingin menghapus genre ini?</p>
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

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Tambah Genre Baru</h3>
            <form onSubmit={handleAddGenre}>
              <div className="mb-4">
                <label htmlFor="genreName" className="block mb-2 text-sm font-medium">
                  Nama Genre
                </label>
                <input
                  type="text"
                  id="genreName"
                  value={newGenreName}
                  onChange={(e) => setNewGenreName(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-100"
                  placeholder="Masukkan nama genre"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="genreName" className="block mb-2 text-sm font-medium">
                  Nama Genre
                </label>
                <input
                  type="text"
                  id="genreName"
                  value={newGenreDescription}
                  onChange={(e) => setNewGenreDescription(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-100"
                  placeholder="Masukkan nama genre"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Genre</h3>
            <form onSubmit={handleEditGenre}>
              <div className="mb-4">
                <label htmlFor="editGenreName" className="block mb-2 text-sm font-medium">
                  Nama Genre
                </label>
                <input
                  type="text"
                  id="editGenreName"
                  value={editGenreName}
                  onChange={(e) => setEditGenreName(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-100"
                  placeholder="Masukkan nama genre"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editGenreName" className="block mb-2 text-sm font-medium">
                  Nama Genre
                </label>
                <input
                  type="text"
                  id="editGenreName"
                  value={editGenreDescription}
                  onChange={(e) => setEditGenreDescription(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-100"
                  placeholder="Masukkan nama genre"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                >
                  Perbarui
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Tag className="mr-2" />
        Daftar Genre 
      </h1>
      
      {success && (
        <div className="mb-4 p-3 bg-green-600 bg-opacity-25 border border-green-600 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-600 bg-opacity-25 border border-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <button 
        onClick={() => setShowAddForm(true)}
        className="inline-flex items-center mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium"
      >
        <Plus className="mr-2 h-5 w-5" />
        Tambah Genre Baru
      </button>

      <div className="mb-6 relative"> 
        <input
          type="text"
          placeholder="Cari genre..."
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
              <th className="p-3 text-left">Nama Genre</th>
              <th className="p-3 text-left">Tanggal Dibuat</th>
              <th className="p-3 text-left">Terakhir Diperbarui</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredGenres.map((genre) => (
              <tr key={genre.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                <td className="p-3">{genre.title}</td>
                <td className="p-3">{formatDate(genre.createdAt)}</td>
                <td className="p-3">{formatDate(genre.updatedAt)}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdate(genre)}
                    className="mr-2 p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                    aria-label="Update"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(genre.id)}
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
      {filteredGenres.length === 0 && (
        <p className="text-center mt-4 text-gray-400">Tidak ada genre yang ditemukan.</p>
      )}
    </div>
  )
}
