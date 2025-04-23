import React from 'react'

function ChapterPopularSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 p-3 bg-zinc-800/50 rounded-lg animate-pulse">
          <div className="flex items-center justify-center w-8 h-8 bg-zinc-700 rounded-lg text-white font-bold">
            {/* Nomor urut dummy */}
            <span className="opacity-0">1</span>
          </div>
          <div className="flex gap-3 flex-1">
            <div className="w-[60px] h-[80px] bg-zinc-700 rounded" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-zinc-700 rounded w-3/4" />
              <div className="h-3 bg-zinc-700 rounded w-1/2" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-4 h-4 bg-zinc-700 rounded" />
                ))}
                <div className="w-6 h-3 bg-zinc-700 rounded ml-1" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChapterPopularSkeleton
