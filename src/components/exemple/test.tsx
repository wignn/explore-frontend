import { formatDate } from "@/lib/dateFormat";
import Image from "next/image";
import React from "react";



type Genre = {
  Genre: {
    id: string;
    title: string;
}
};
  
  type Chapter = {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
    description: string;
  };
  
  interface BookProps {
    id: string;
    title: string;
    cover: string;
    description: string;
    author: string;
    updatedAt: string;
    popular: boolean;
    genre: Genre[];
    Chapter: Chapter[];
    createdAt: string;
  }


  interface NovelDetailsProps {
    book: BookProps;
    Popular: BookProps[];
  }

  const NovelDetails: React.FC<NovelDetailsProps> = ({ book, Popular }) => {
  console.log(Popular)
  return (
    
    <div className="min-h-screen bg-gray-900 text-white ">
      <nav className="p-4 text-sm text-zinc-300">
        <div className="max-w-7xl mx-auto flex gap-2">
          <a href="#" className="hover:text-white">
            Home
          </a>
          <span>›</span>
          <span className="text-zinc-400">{book.title}</span>
        </div>
      </nav>

  <div className="flex justify-center px-4">  
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8">  
      <main className="max-w-5xl mx-auto rounded-md bg-zinc-900 p-6 grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-8">
        <div className="space-y-6 ">
          <div className="grid md:grid-cols-[300px,1fr] gap-6">
            <div className="space-y-4">
            <Image
                src={book.cover} 
                alt="Novel Cover"
                width={300}
                height={450}
                className="w-full rounded-lg"
            />

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                Bookmark
              </button>
              <p className="text-sm text-zinc-400 text-center">Followed 204 people</p>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-[300px, 1fr] ld:grid-cols-[500px,1fr] gap-4">
                  <div className="space-y-2">
                    <p>
                      <span className="text-zinc-400">Status:</span> Ongoing
                    </p>
                    <p>
                      <span className="text-zinc-400">Author:</span> {book.author}
                    </p>
                    <p>
                      <span className="text-zinc-400">Released:</span> 2024
                    </p>
                    {/* <p>
                      <span className="text-zinc-400">Native Language:</span> Korean
                    </p> */}
                  </div>
                  <div className="space-y-2">
                    {/* <p>
                      <span className="text-zinc-400">Posted by:</span> Noble nible
                    </p> */}
                    <p>
                      <span className="text-zinc-400">Posted on:</span> {formatDate(book.createdAt)}
                    </p>
                    <p>
                      <span className="text-zinc-400">Updated on:</span> {formatDate(book.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {book.genre.map((genre) => (
                  <span key={genre.Genre.id} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm">
                  {genre.Genre.title}
                  </span>
                ))}

              </div>


{/*                 
                di bawah ini harus nya untuk tag tapi masih dalam pengembangan
*/}
              {/* <div className="flex flex-wrap gap-2 pt-4">
                {["harem", "medieval", "obsessive love", "return"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-zinc-800 rounded-full">
                    {tag}
                  </span>
                ))}
              </div> */}

            </div>
            
          </div>
{/* 
                ini bagian Synopsis */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Synopsis {book.title}</h2>
            <div className="space-y-2 text-zinc-300">
              <p>{book.description}</p>
        
            </div>
          </div>
          <div>
  <h2 className="text-xl font-bold mb-4">Chapters</h2>
  <div className="space-y-4">
    {book.Chapter.length > 0 ? (
      book.Chapter.map((chapter) => (
        <div
          key={chapter.id}
          className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800/70 transition-colors duration-200 border border-zinc-700/50"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-purple-400">{chapter.title}</h3>
            <p className="text-xs text-zinc-400">Updated on {formatDate(chapter.updatedAt)}</p>
          </div>
          <p className="text-sm text-zinc-300 mt-2">{chapter.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-400"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span className="text-xs text-zinc-400">Chapter</span>
          </div>
        </div>
      ))
    ) : (
      <div className="p-4 flex items-center justify-center rounded-lg">
        <p className="text-zinc-400">Belum Ada Chapter</p>
      </div>
    )}
  </div>
</div>

        </div>

   
      </main>
      <div className="w-full space-y-4 bg-zinc-900 py-2  rounded-lg">
  <h2 className="text-xl font-bold text-center">Popular Novels</h2>
  <div className="space-y-4">
    {Popular.map((novel, i) => (
      <div key={i} className="flex gap-4 p-3 w-[350px] mx-14 bg-zinc-800/50 rounded-lg">
        <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-lg text-white font-bold">
          {i + 1}
        </div>
        <div className="flex gap-3 flex-1">

          <div className="flex-shrink-0">
            <Image
              src={novel.cover || "/placeholder.svg"}
              alt={novel.title}
              width={60}
              height={80}
              className="rounded object-cover w-[60px] h-[80px]"
            />
          </div>

          <div className="flex flex-col justify-between w-full">
            <h3 className="font-medium whitespace-normal">{novel.title}</h3>
            <p className="text-xs text-zinc-400">Genres: {novel.genre.join(", ")}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={i < 5 / 2 ? "#fbbf24" : "#4b5563"}
                  stroke="none"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="text-sm text-zinc-400 ml-1">{5}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
        </div>

    </div>
  )
}

export default NovelDetails