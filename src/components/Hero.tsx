import { UserInterface } from "@/types/user"
import React from "react"



interface HeroProps {
    user?: UserInterface
}

const Hero:React.FC<HeroProps> = (user) => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 py-16 md:py-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,200,200,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,200,200,0.05),transparent_70%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Discover Your Next Reading Adventure
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
              Explore our collection of books and find your next favorite story. Updated regularly with new content.
            </p>

            {user ? (
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/bookmark"
                  className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-xl hover:shadow-teal-500/30"
                >
                  My Library
                </a>
                <a
                  href="/view"
                  className="rounded-full border border-gray-700 bg-gray-800/50 px-6 py-3 font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-800 hover:text-white"
                >
                  Browse All
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/auth/signin"
                  className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-xl hover:shadow-teal-500/30"
                >
                  Sign In
                </a>
                <a
                  href="/browse"
                  className="rounded-full border border-gray-700 bg-gray-800/50 px-6 py-3 font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-800 hover:text-white"
                >
                  Browse Books
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    )
}

export default Hero