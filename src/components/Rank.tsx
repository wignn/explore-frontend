"use client"

import { useEffect, useState } from "react"
import List from "./List"
import { bookInterface } from "@/types/book"




const genres = ["Popular", "Action", "Fantasy", "Romance"]



function Rank({ books }: { books: bookInterface[] }) {
  const [selectedGenre, setSelectedGenre] = useState("Popular")
  const [filteredBooks, setFilteredBooks] = useState(books)

  useEffect(() => {
    if (books.length === 0) return
    if (selectedGenre === "Popular") {
      setFilteredBooks(
        [...books]
          .filter((book) => book.bookmark?.length > 0)
          .sort((a, b) => (b.bookmark?.length || 0) - (a.bookmark?.length || 0))
          .slice(0, 6),
      )
    } else {
      setFilteredBooks(
        books
          .filter((book) => book.genre?.some((g) => g.title.toLowerCase() === selectedGenre.toLowerCase()))
          .slice(0, 6)
      );
    }
  }, [selectedGenre, books])

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center my-6 gap-4 items-center">
          {genres.map((genre) => (
            <li key={genre}>
              <button
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${
                  selectedGenre === genre
                    ? "bg-teal-500 text-gray-900 shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-teal-300"
                }`}
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {filteredBooks.length > 0 ? (
        <List books={filteredBooks}/>
      ) : (
        <div className="text-center text-gray-400 py-20">
          <p className="text-xl">No books available for {selectedGenre}</p>
        </div>
      )}
    </div>
  )
}

export default Rank



