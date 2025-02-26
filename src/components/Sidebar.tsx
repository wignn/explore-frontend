"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BookPlus, Tag, Menu, X, BookA } from 'lucide-react'

const sidebarItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Create Book", path: "/dashboard/book/create", icon: BookPlus },
  { name: "Book", path: "/dashboard/book", icon: BookA },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [isMobile])

  return (
    <>

      <nav
        className={cn(
          "fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "flex flex-col w-64 bg-gray-900 text-gray-100 overflow-y-auto",
          "md:translate-x-0 md:sticky md:top-0 md:h-screen"
        )}
      >
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl font-bold text-gray-200">BookApp</h1>
        </div>
        <div className="flex flex-col flex-1 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200",
                  pathname === item.path
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
