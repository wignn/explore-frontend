
import { bookInterface } from '@/types/book'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'



function ChapterpopularNovels({ Popular }: { Popular: bookInterface[] }) {
  return (
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
                      <Link href={`/view/${novel.title.replaceAll(" ", "-")}`}>
                        {novel.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {novel.genre.map((genre) => genre?.title).join(", ")}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={i < 10 / 2 ? "#fbbf24" : "#4b5563"}
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
  )
}

export default ChapterpopularNovels