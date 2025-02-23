"use client"

import type React from "react"
import { Menu } from "lucide-react"

const NavbarSkeleton: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Skeleton */}
          <div className="w-16 h-8 bg-gray-700 rounded"></div>

          <div className="hidden md:flex items-center space-x-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gray-700 rounded"></div>
                <div className="w-16 h-4 bg-gray-700 rounded"></div>
              </div>
            ))}

            <div className="w-20 h-8 bg-gray-700 rounded-full"></div>
          </div>

          <div className="md:hidden">
            <div className="text-gray-300">
              <Menu className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarSkeleton

