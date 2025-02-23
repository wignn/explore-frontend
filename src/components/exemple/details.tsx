import { formatDate } from "@/lib/dateFormat";
import Image from "next/image";
import React from "react";

type Genre = {
  Genre: {
    id: string;
    title: string;
  };
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
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="p-4 text-sm text-zinc-300">
        <div className="max-w-7xl mx-auto flex gap-2">
          <a href="#" className="hover:text-white">Home</a>
          <span>›</span>
          <span className="text-zinc-400">{book.title}</span>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row justify-center px-4">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8">
          <main className="w-full lg:w-3/4 rounded-md bg-zinc-900 p-6 space-y-8">
            <div className="grid  grid-cols-1 md:grid-cols-2 w-auto  m-4">
              <div className="space-y-4 w-[300px]">
                <Image
                  src={book.cover}
                  alt="Novel Cover"
                  width={300}
                  height={450}
                  className="w-full md:w-[300px] h-auto rounded-lg object-cover"
                />
                <div className=" justify-center flex md:w-[300px]">
                <button className="w-full md:w-24 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md flex items-center justify-center gap-2">
                  <svg width="20" height="20" fill="none" stroke="currentColor">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                  Bookmark
                </button>
              </div>
              </div>

              <div className="space-y-4 md:ml-0 ">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <div className="grid gap-3 text-sm">
                  <p><span className="text-zinc-400">Status:</span> Ongoing</p>
                  <p><span className="text-zinc-400">Author:</span> {book.author || "Unknown"}</p>
                  <p><span className="text-zinc-400">Released:</span> 2024</p>
                  <p><span className="text-zinc-400">Posted on:</span> {formatDate(book.createdAt)}</p>
                  <p><span className="text-zinc-400">Updated on:</span> {formatDate(book.updatedAt)}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {book.genre.map((genre) => (
                    <span key={genre.Genre.id} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm">
                      {genre.Genre.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold">Synopsis</h2>
              <p className="text-zinc-300">{book.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Chapters</h2>
              <div className="space-y-4">
                {book.Chapter.length > 0 ? book.Chapter.map((chapter) => (
                  <div key={chapter.id} className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800/70 transition">
                    <h3 className="text-lg font-bold text-purple-400">{chapter.title}</h3>
                    <p className="text-xs text-zinc-400">Updated on {formatDate(chapter.updatedAt)}</p>
                    <p className="text-sm text-zinc-300 mt-2">{chapter.description}</p>
                  </div>
                )) : (
                  <div className="p-4 flex items-center justify-center rounded-lg">
                    <p className="text-zinc-400">Belum Ada Chapter</p>
                  </div>
                )}
              </div>
            </div>
          </main>
          <aside className="w-full lg:w-1/4 h-auto bg-zinc-900 py-4 rounded-lg">
  <h2 className="text-xl font-bold text-center">Popular Novels</h2>
  <div className="grid grid-cols-1  gap-4 px-4">
    {Popular.map((novel, i) => (
      <div key={i} className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg">
        <div className="w-14 h-8 text-white font-bold flex items-center justify-center">
          {i + 1}
        </div>
        <Image
          src={novel.cover || "/placeholder.svg"}
          alt={novel.title}
          width={60}
          height={80}
          className="rounded object-cover w-[60px] h-[80px]"
        />
        <div className="flex-1">
          <h3 className="font-medium md:text-sm truncate w-[160px]">
            {novel.title.length > 30 ? novel.title.slice(0, 30) + "..." : novel.title}
          </h3>
          <p className="text-xs text-zinc-400 truncate w-[160px]">
            Genres: {novel.genre.map((genre) => genre.Genre.title)}
          </p>
        </div>
      </div>
    ))}
  </div>
</aside>

        </div>
      </div>
    </div>
  );
};

export default NovelDetails;