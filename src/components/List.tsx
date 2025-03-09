"use client";

import { timeAgo } from "@/lib/DateToHour";
import { Book, Clock } from "lucide-react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Skeleton } from "@/components/loading/skletonBook";
import type { bookInterface } from "@/types/book";
import Link from "next/link";
import Image from "next/image";
import { normalizeTitle } from "../lib/utils";
import { memo, Suspense } from "react";

interface ListProps {
  books: bookInterface[];
}

const List = memo(({ books }: { books: ListProps["books"] }) => {
  return (
    <div className="mx-auto">
      {books.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-8">
          {books.map((book, index) => (
            <LazyMotion features={domAnimation} key={book.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-teal-500/20"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
                  <Image
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {book.chapter?.length > 0 && (
                    <div className="absolute top-2 right-2 z-20 rounded-full bg-teal-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      Ch. {book.chapter.length}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <Link href={`/view/${normalizeTitle(book.title)}`} className="group-hover:text-teal-300">
                    <h2 className="line-clamp-2 font-semibold text-gray-100 transition-colors duration-200 text-sm md:text-base">
                      {book.title}
                    </h2>
                  </Link>

                  <div className="mt-3 flex flex-col text-xs md:text-sm">
                    <div className="flex items-center mb-2 gap-1.5 text-gray-400">
                      <Book className="h-3.5 w-3.5 text-teal-400" />
                      <span>
                        {book.chapter?.length > 0 ? (
                          <Link
                            href={`/view/${normalizeTitle(book.title)}/${book?.chapter[book?.chapter?.length - 1]?.id}`}
                            className="transition-colors duration-200 hover:text-teal-300"
                          >
                            Chapter {book.chapter.length}
                          </Link>
                        ) : (
                          <span>No chapters</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{timeAgo(book.updatedAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
              </motion.div>
            </LazyMotion>
          ))}
        </div>
      ) : (
        <Suspense fallback={<BookListSkeleton />}>
          <NoBooksFound />
        </Suspense>
      )}
    </div>
  );
});

function NoBooksFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center rounded-xl bg-gray-800/50 backdrop-blur-sm py-16 px-4"
    >
      <div className="relative mb-6 h-24 w-24">
        <Book className="h-full w-full text-gray-700" />
      </div>
      <h3 className="mb-2 text-xl font-medium text-gray-300">Tidak ada buku yang tersedia</h3>
      <p className="text-center text-gray-500">Buku yang Anda cari belum tersedia saat ini.</p>
    </motion.div>
  );
}

export function BookListSkeleton() {
  return (
    <div className="mx-auto">
      <Skeleton className="mb-2 h-8 w-48 rounded-lg bg-gray-800" />
      <Skeleton className="mb-8 h-1 w-20 rounded-full bg-gray-800" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-8">
        {[...Array(10)].map((_, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            key={i}
            className="flex flex-col overflow-hidden rounded-xl bg-gray-800/80 backdrop-blur-sm"
          >
            <Skeleton className="aspect-[3/4] w-full bg-gray-700/70" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-full rounded bg-gray-700/70" />
              <Skeleton className="h-4 w-3/4 rounded bg-gray-700/70" />
              <div className="flex justify-between pt-1">
                <Skeleton className="h-4 w-1/3 rounded bg-gray-700/70" />
                <Skeleton className="h-4 w-1/4 rounded bg-gray-700/70" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default List;
