"use client";

import dynamic from "next/dynamic";
import { formatDate } from "@/lib/dateFormat";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
//import ChapterList from "@/components/view/chapter/Chapter-details";
import { bookInterface, bookmark } from "@/types/book";
import { apiRequest } from "@/lib/Request";

import ChapterpopularNovels from "@/components/view/chapter/PopularNovels";

const ChapterList = dynamic(
  () => import("@/components/view/chapter/Chapter-details"),
  { ssr: false }
);

interface NovelDetailsProps {
  book: bookInterface;
  Popular: bookInterface[];
  userId: string;
  accessToken: string;
  Bookmark: bookmark | null;
}

const NovelDetails: React.FC<NovelDetailsProps> = ({
  book,
  Popular,
  userId,
  accessToken,
  Bookmark,
}) => {
  const [bookmark, setBookmark] = useState<bookmark | null>(Bookmark);
  const [isProcessing, setIsProcessing] = useState(false);
  const isHandlingRef = useRef(false);

  useEffect(() => {
    setBookmark(Bookmark);
  }, [Bookmark, accessToken]);
  const handleBookmark = async () => {
    if (!userId) {
      console.warn("User tidak login, tidak bisa menambah bookmark.");
      return;
    }

    isHandlingRef.current = true;
    if (isProcessing) return;

    setIsProcessing(true);
    const prevBookmark = bookmark;

    try {
      if (bookmark) {
        await apiRequest({
          endpoint: `/bookmark/${bookmark.id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBookmark(null);
      } else {
        const response = await apiRequest<{ data: bookmark }>({
          endpoint: `/bookmark`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            bookId: book.id,
            userId,
          },
        });
        const newBookmark = {
          id: response.data.id,
          bookId: response.data.bookId,
          userId: response.data.userId,
        };
        setBookmark(newBookmark);
      }
    } catch (e) {
      console.error("Gagal mengubah bookmark:", e);
      setBookmark(prevBookmark);
    } finally {
      isHandlingRef.current = false;
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <nav className="p-4 text-sm text-zinc-300">
        <div className="max-w-7xl mx-auto flex gap-2">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>›</span>
          <span className="text-zinc-400">{book.title}</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-[300px,1fr] gap-6">
            <div className="space-y-4">
              <Image
                src={book.cover || "/placeholder.svg"}
                alt="Novel Cover"
                width={300}
                height={450}
                className="w-2/3 mx-auto md:mx-0 md:w-full rounded-lg"
              />
              <button
                onClick={handleBookmark}
                className={`w-1/2 mx-auto md:mx-0 md:w-full p-2 rounded-md flex items-center justify-center gap-2 ${
                  bookmark
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white`}
                disabled={isProcessing}
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
                {bookmark ? "Bookmarked" : "Bookmark"}
              </button>
              <p className="text-sm text-zinc-400 text-center">{`Followed ${book.bookmark.length} people`}</p>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-[200px,1fr] gap-4">
                  <div className="space-y-2">
                    <p>
                      <span className="text-zinc-400">Status:</span>{" "}
                      {book.status}
                    </p>
                    <p>
                      <span className="text-zinc-400">Author:</span>{" "}
                      {book.author || "Unknown"}
                    </p>
                    <p>
                      <span className="text-zinc-400">Released:</span>{" "}
                      {book.realaseDate}
                    </p>
                    <p>
                      <span className="text-zinc-400">Native Language:</span>{" "}
                      {book.language}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="text-zinc-400">Posted by:</span> wign
                    </p>
                    <p>
                      <span className="text-zinc-400">Posted on:</span>{" "}
                      {formatDate(book.createdAt)}
                    </p>
                    <p>
                      <span className="text-zinc-400">Updated on:</span>{" "}
                      {formatDate(book.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {book.genre.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm"
                  >
                    {tag.title}
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
          {}
          {book.chapter && book.chapter.length > 0 ? (
            <ChapterList chapters={book.chapter} bookTitle={book.title} />
          ) : (
            <div className="text-center py-8 text-zinc-400">
              No chapters available yet
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Popular Novels</h2>
            <ChapterpopularNovels Popular={Popular}/>
        
        </div>
      </main>
    </div>
  );
};

export default NovelDetails;
