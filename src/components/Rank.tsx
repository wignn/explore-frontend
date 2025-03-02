"use client"

import { useEffect, useState } from "react"
import List from "./List"

interface Genre {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  content: string;
  updatedAt: string;
  chapterNum: number;
  createdAt: string;
}

export type book = {  
  id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  updatedAt: string;
  popular: boolean;
  genre: Genre[];
  chapter: Chapter[];
  createdAt: string;
  bookmark: bookmark[];
};

type bookmark = {
  id: string;
  bookId: string;
  userId: string;
}
interface RankProps {
  books:book[]
}

const genres = ["Popular", "Action", "Fantasy", "Romance"]

function Rank({ books }: RankProps) {
  const [selectedGenre, setSelectedGenre] = useState("Popular")
  const [filteredBooks, setFilteredBooks] = useState(books)

  useEffect(() => {
    if (books.length === 0) return
    if (selectedGenre === "Popular") {
      setFilteredBooks(
        [...books] 
          .filter((book) => book.bookmark?.length > 0) 
          .sort((a, b) => (b.bookmark.length || 0) - (a.bookmark?.length || 0)) 
          .slice(0, 10) 
      );
    } else {
      setFilteredBooks(
        books.filter((book) => book.genre?.some((g) => g.title.toLowerCase() === selectedGenre.toLowerCase())),
      )
    }
  }, [selectedGenre, books])

  return (
    <div className="bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center font-bold text-teal-400 mb-6">Top Ranked Books</h2>
        <div className="mb-8">
          <ul className="flex flex-wrap justify-center gap-4 items-center">
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
          <List books={filteredBooks} text={`${selectedGenre} Books`} />
        ) : (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No books available for {selectedGenre}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Rank

