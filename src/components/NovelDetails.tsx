import { createBookmark, deleteBookmark } from "@/lib/action/bookmark";
import { formatDate } from "@/lib/dateFormat";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

interface BookPopular {
  id: string;
  title: string;
  cover: string;
  description: string;
  author: string;
  updatedAt: string;
  popular: boolean;
  genre: {
    id: string;
    title: string;
  }[];
  Chapter: Chapter[];
  createdAt: string;

}

export interface User {
      id: string;
      name: string;
      profilePic?: string | null;
      username: string;
      email: string;
      bio: string;
      createdAt: string;
      updatedAt: string;
      lastLogin: string;
      token: string;
      valToken: string;
      isAdmin: boolean;
}

interface BookmarkProps {
  id: string;
  bookId: string;
  userId: string;
}

interface NovelDetailsProps {
  book: BookProps;
  Popular: BookPopular[];
  userId: string;
  accessToken: string;
  Bookmark: any;
};


const NovelDetails: React.FC<NovelDetailsProps> = ({ book, Popular, userId, accessToken, Bookmark }) => {
  const [bookmark, setBookmark] = useState<BookmarkProps | null>(Bookmark);

  useEffect(() => { 
    setBookmark(Bookmark);
  }, [Bookmark]);

  const handleBookmark = async () => {
    if (!userId) {
      console.warn("User tidak login, tidak bisa menambah bookmark.");
      return;
    }

    const prevBookmark = bookmark; 

    try {
      if (bookmark) {
        setBookmark(null);
        await deleteBookmark(bookmark.id, accessToken);
      } else {
        const newBookmark = { id: Date.now().toString(), bookId: book.id, userId }; 
        setBookmark(newBookmark);
        await createBookmark(userId, book.id, accessToken);
      }
    } catch (e) {
      console.error("Gagal mengubah bookmark:", e);
      setBookmark(prevBookmark); 
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <nav className="p-4 text-sm text-zinc-300">
        <div className="max-w-7xl mx-auto flex gap-2">
          <a href="#" className="hover:text-white">Home</a>
          <span>›</span>
          <span className="text-zinc-400">{book.title}</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-[300px,1fr] gap-6">
            <div className="space-y-4">
              <Image
                src={book.cover}
                alt="Novel Cover"
                width={300}
                height={450}
                className="w-full rounded-lg"
              />
              <button
                onClick={handleBookmark}
                className={`w-full p-2 rounded-md flex items-center justify-center gap-2 ${
                  bookmark ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
                } text-white`}
              >
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
                {bookmark ? "Hapus Bookmark" : "Tambahkan Bookmark"}
              </button>
              <p className="text-sm text-zinc-400 text-center">Followed 204 people</p>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-[200px,1fr] gap-4">
                  <div className="space-y-2">
                    <p><span className="text-zinc-400">Status:</span> Ongoing</p>
                    <p><span className="text-zinc-400">Author:</span> {book.author || "Unknown"}</p>
                    <p><span className="text-zinc-400">Released:</span> 2024</p>
                    <p><span className="text-zinc-400">Native Language:</span> Korean</p>
                  </div>
                  <div className="space-y-2">
                    <p><span className="text-zinc-400">Posted by:</span> wign</p>
                    <p><span className="text-zinc-400">Posted on:</span> {formatDate(book.createdAt)}</p>
                    <p><span className="text-zinc-400">Updated on:</span> {formatDate(book.updatedAt)}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {book.genre.map((tag) => (
                  <span key={tag.Genre.id} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm">
                    {tag.Genre.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Synopsis {book.title}</h2>
            <div className="space-y-2 text-zinc-300">
              <p>{book.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Popular Novels</h2>
          <div className="space-y-4">
            {Popular.map((novel, i) => (
              <div key={i} className="flex gap-4 p-3 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-lg text-white font-bold">
                  {i + 1}
                </div>
                <div className="flex gap-3 flex-1">
                  <Image
                    src={novel.cover || "/placeholder.svg"}
                    alt={novel.title}
                    width={60}
                    height={80}
                    className="rounded"
                  />
                  <div className="space-y-1">
                    <h3 className="font-medium line-clamp-2">
                      <a href={`/view/${novel.title.replaceAll(" ", "-")}`}>{novel.title}</a>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Genres: {novel.genre.map((genre) => genre?.title).join(", ")}
                    </p>
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
                      <span className="text-sm text-zinc-400 ml-1">5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NovelDetails;