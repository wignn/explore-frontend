"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Filter, SortDesc, SortAsc, ChevronDown, X } from "lucide-react"

interface FilterControlsProps {
  genres: string[]
  currentGenre: string
  currentSort: string
  searchQuery: string
}

export default function FilterControls({ genres, currentGenre, currentSort, searchQuery }: FilterControlsProps) {
  const router = useRouter()
  const [isGenreOpen, setIsGenreOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsGenreOpen(false)
      setIsSortOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleGenreClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsGenreOpen(!isGenreOpen)
    setIsSortOpen(false)
  }

  const handleSortClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSortOpen(!isSortOpen)
    setIsGenreOpen(false)
  }

  const applyGenreFilter = (genre: string) => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("query", searchQuery)
    if (genre) params.set("genre", genre)
    if (currentSort !== "newest") params.set("sort", currentSort)

    router.push(`/search?${params.toString()}`)
  }

  const applySortOrder = (sort: string) => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("query", searchQuery)
    if (currentGenre) params.set("genre", currentGenre)
    if (sort !== "newest") params.set("sort", sort)

    router.push(`/search?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("query", searchQuery)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {(currentGenre || currentSort !== "newest") && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 rounded-full border border-gray-700 bg-gray-800/70 px-3 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-700 hover:text-white"
        >
          <X className="h-3 w-3" />
          Clear Filters
        </button>
      )}

      <div className="relative">
        <button
          onClick={handleGenreClick}
          className={`flex items-center gap-1 rounded-full border ${
            currentGenre
              ? "border-teal-500/50 bg-teal-500/10 text-teal-300"
              : "border-gray-700 bg-gray-800/70 text-gray-300"
          } px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all hover:bg-gray-700 hover:text-white`}
        >
          <Filter className="h-3 w-3" />
          {currentGenre || "Genre"}
          <ChevronDown className="h-3 w-3" />
        </button>

        {isGenreOpen && (
          <div
            className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-60 overflow-y-auto py-1">
              <button
                onClick={() => applyGenreFilter("")}
                className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                  !currentGenre ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                All Genres
              </button>

              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => applyGenreFilter(genre)}
                  className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                    currentGenre === genre ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={handleSortClick}
          className={`flex items-center gap-1 rounded-full border ${
            currentSort !== "newest"
              ? "border-teal-500/50 bg-teal-500/10 text-teal-300"
              : "border-gray-700 bg-gray-800/70 text-gray-300"
          } px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all hover:bg-gray-700 hover:text-white`}
        >
          {currentSort === "newest" ? (
            <>
              <SortDesc className="h-3 w-3" />
              Newest First
            </>
          ) : (
            <>
              <SortAsc className="h-3 w-3" />
              Oldest First
            </>
          )}
          <ChevronDown className="h-3 w-3" />
        </button>

        {isSortOpen && (
          <div
            className="absolute right-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => applySortOrder("newest")}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
                currentSort === "newest" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <SortDesc className="h-3 w-3" />
              Newest First
            </button>

            <button
              onClick={() => applySortOrder("oldest")}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
                currentSort === "oldest" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <SortAsc className="h-3 w-3" />
              Oldest First
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

