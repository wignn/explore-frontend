import { Book, Globe, Users, Bookmark } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/aboutBG.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>

          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-2xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r text-teal-400 bg-clip-text">
                  Wi<span className="text-white">gn</span>
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                A trial web application built using Next.js & NestJS for a personal project and portfolio.
              </p>
            </div>

            <div className="space-y-6 animate-fade-in-delayed">
              <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto">
                Featuring a RESTful architecture, this project demonstrates full-stack development with modern tools and clean design.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href={"/view"}>
                  <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                    View Project
                  </button>
                </Link>
                <Link href={"#features"}>
                  <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 rounded-lg transform transition-all hover:scale-105">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gray-900" id="features">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Project Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="text-center space-y-4">
                <Book className="w-10 h-10 mx-auto text-purple-400" />
                <h3 className="font-semibold text-xl">Next.js Frontend</h3>
                <p className="text-gray-400">Built with Next.js and TailwindCSS for fast, responsive, modern UI</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="text-center space-y-4">
                <Globe className="w-10 h-10 mx-auto text-purple-400" />
                <h3 className="font-semibold text-xl">NestJS Backend</h3>
                <p className="text-gray-400">A secure and modular REST API built using NestJS and PostgreSQL</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="text-center space-y-4">
                <Users className="w-10 h-10 mx-auto text-purple-400" />
                <h3 className="font-semibold text-xl">User</h3>
                <p className="text-gray-400">User Authentication and User Management System.</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="text-center space-y-4">
                <Bookmark className="w-10 h-10 mx-auto text-purple-400" />
                <h3 className="font-semibold text-xl">Clean UI Components</h3>
                <p className="text-gray-400">Reusable components designed for easy scaling and customization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">100+</div>
              <div className="text-gray-400">API Endpoints</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">50+</div>
              <div className="text-gray-400">UI Components</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">1</div>
              <div className="text-gray-400">Full-Stack Architecture</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="px-4 py-16 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">About the Tech Stack</h2>
          <p className="text-gray-400 text-lg">
            This project is part of my full-stack development portfolio. The frontend is built with <strong>Next.js</strong> and styled using <strong>Tailwind CSS</strong>. The backend runs on <strong>NestJS</strong>, providing a robust RESTful API with PostgreSQL and Prisma ORM.
          </p>
          <Link href={"https://github.com/wignn/explore-frontend"}>
          <button  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 transform hover:scale-105">
            View GitHub Repo
          </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
