"use client";

import type { UserInterface } from "@/types/user";
import Link from "next/link";
import type React from "react";
import {
  BookOpen,
  Bookmark,
  ChevronRight,
  Sparkles,
  Clock,
} from "lucide-react";
import type { bookInterface } from "@/types/book";
import Image from "next/image";
import { normalizeTitle } from "@/lib/utils";

interface HeroProps {
  user?: UserInterface;
  book: bookInterface[];
}

const pMoc = [
  {
    id: 1,
    cover: "/slv.png",
  },
  {
    id: 2,
    cover: "/sk.jpg",
  },
  {
    id: 3,
    cover: "/rg.jpg",
  },
];

const Hero: React.FC<HeroProps> = ({ user, book }) => {
  const currentBook = book.length > 0 ? book[0] : null;

  const recentBooks = book.slice(1, 4);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-950 py-16 md:py-24 lg:py-24 min-h-[90vh] flex items-center">
 
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,200,200,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,200,200,0.1),transparent_70%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-[120px] opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500 rounded-full filter blur-[120px] opacity-20"></div>
      </div>

      <div className="relative mx-12 z-10 w-full px-4 sm:px-6 lg:px-8 flex justify-center">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-gray-800/50 border border-gray-700 text-cyan-400 text-sm font-medium">
              <Sparkles size={16} className="mr-2" />
              <span>Discover new worlds through reading</span>
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Discover Your Next Reading Adventure
            </h1>

            <p className="mb-8 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
              Explore our curated collection of books and find your next
              favorite story. Updated regularly with new content from top
              authors around the world.
            </p>

            {user ? (
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href="/bookmark"
                  className="group rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-xl hover:shadow-teal-500/30 flex items-center"
                >
                  <Bookmark size={18} className="mr-2" />
                  My Library
                  <ChevronRight
                    size={16}
                    className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                </Link>
                <Link
                  href="/view"
                  className="rounded-full border border-gray-700 bg-gray-800/50 px-6 py-3 font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-800 hover:text-white flex items-center"
                >
                  <BookOpen size={18} className="mr-2" />
                  Browse All
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href="/login"
                  className="group rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-xl hover:shadow-teal-500/30 flex items-center"
                >
                  Sign In
                  <ChevronRight
                    size={16}
                    className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                </Link>
                <Link
                  href="/view"
                  className="rounded-full border border-gray-700 bg-gray-800/50 px-6 py-3 font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-800 hover:text-white flex items-center"
                >
                  <BookOpen size={18} className="mr-2" />
                  Browse Books
                </Link>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <BookOpen size={16} className="text-cyan-400" />
                </div>
                <div>
                  <span className="text-cyan-400 font-medium">10+</span> Books
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-teal-400" />
                </div>
                <div>
                  <span className="text-teal-400 font-medium">10+</span> Authors
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Bookmark size={16} className="text-cyan-400" />
                </div>
                <div>
                  <span className="text-cyan-400 font-medium">10+</span> Active
                  Readers
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6">
              <div className="flex -space-x-2">
                {pMoc.map((i) => (
                  <div
                    key={i.id}
                    className="w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden"
                  >
                    <Image
                      src={i.cover}
                      alt="User avatar"
                      width={64}
                      height={64}
                      sizes="(max-width: 768px) 32px, 64px"
                      className="rounded-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-cyan-400 font-medium">10+</span> readers
                joined this month
              </div>
            </div>
          </div>

          <div className="relative mt-12 hidden md:block lg:mt-0">
            <div className="relative mx-auto max-w-md">
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="flex p-4 gap-4">
                  {currentBook ? (
                    <>
                      <div className="w-24 h-36 flex-shrink-0 rounded-md overflow-hidden shadow-lg relative">
                        {currentBook.cover ? (
                          <Image
                            src={currentBook.cover || "/placeholder.svg"}
                            alt={currentBook.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-teal-600"></div>
                        )}
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 to-teal-500"></div>
                        {!currentBook.cover && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white font-bold text-xs text-center px-2">
                              {currentBook.title}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Book details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs">
                            <Clock size={10} className="mr-1" />
                            Now Reading
                          </div>
                          <div className="text-gray-400 text-xs">
                            {0}% Complete
                          </div>
                        </div>
                        <h2 className="text-white font-medium mt-2">
                          {currentBook.title}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                          {currentBook.author}
                        </p>
                        <div className="mt-3 h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                            style={{ width: `${0}%` }}
                          ></div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <Link
                            href={`/view/${normalizeTitle(currentBook.title)}`}
                            className="text-xs text-white bg-gray-700/50 hover:bg-gray-700 px-3 py-1 rounded-full transition-colors"
                          >
                            Continue Reading
                          </Link>
                          {/* <div className="text-gray-400 text-xs">
                            {currentBook.currentChapter
                              ? `Chapter ${currentBook.currentChapter}`
                              : ""}
                            {currentBook.currentChapter &&
                            currentBook.totalChapters
                              ? " of "
                              : ""}
                            {currentBook.totalChapters
                              ? currentBook.totalChapters
                              : ""}
                          </div> */}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full text-center py-4 text-gray-400">
                      No books in your library yet
                    </div>
                  )}
                </div>

                {/* Recently added section */}
                {recentBooks.length > 0 && (
                  <div className="mt-2 p-4 pt-0">
                    <div className="text-gray-300 text-sm font-medium mb-3">
                      Recently Added
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {recentBooks.map((book, index) => (
                        <Link
                          href={`/view/${normalizeTitle(book.title)}`}
                          key={book.id || index}
                          className="relative h-56 rounded-md overflow-hidden shadow-md group cursor-pointer"
                        >
                          {book.cover ? (
                            <Image
                              src={book.cover || "/placeholder.svg"}
                              alt={`cover ${book.title}`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-teal-600"></div>
                          )}

                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/30"></div>
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-2">
                            <div className="text-white text-xs text-center font-medium">
                              {book.title}
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/10 rounded-full backdrop-blur-md border border-cyan-500/20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-teal-500/10 rounded-full backdrop-blur-md border border-teal-500/20 animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
