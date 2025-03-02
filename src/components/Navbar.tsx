"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Home, Book, Info, Bookmark, User, Settings, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import type { NavbarProps } from "@/types/user"
import { signOut } from "next-auth/react"
import { logout } from "@/lib/action/auth"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/view", label: "Novel", icon: Book },
  { href: "/about", label: "About", icon: Info },
  { href: "/bookmark", label: "Bookmark", icon: Bookmark },
]

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const pathname = usePathname()
  const modalRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfileModal = () => setIsProfileModalOpen(!isProfileModalOpen)
  const handleSignOut = async () => {
    await logout(user?.username as string, user?.token as string)
    signOut()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsProfileModalOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors">
            Wign
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors
                  ${pathname === href ? "text-teal-300" : "text-gray-300 hover:text-teal-400"}`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}

            {user?.profilePic ? (
              <div className="relative group">
                <Image
                  className="h-8 w-8 rounded-full ring-2 ring-teal-500 cursor-pointer
                           transition-transform hover:scale-110"
                  alt="Profile picture"
                  height={32}
                  width={32}
                  src={user.profilePic || "/pMoc.png"}
                  onClick={toggleProfileModal}
                />
                {isProfileModalOpen && (
                  <div
                    ref={modalRef}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-teal-400"
                        role="menuitem"
                      >
                        <User className="mr-3 h-5 w-5" />
                        Profile
                      </Link>
                      <Link
                        href="/dasboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-teal-400"
                        role="menuitem"
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        Admin
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-teal-400"
                        role="menuitem"
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-gray-300 hover:text-teal-400 
                         transition-colors px-4 py-2 rounded-full border border-gray-600
                         hover:border-teal-500 hover:bg-gray-700"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-teal-400 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium
                  ${
                    pathname === href
                      ? "text-teal-300 bg-gray-700"
                      : "text-gray-300 hover:text-teal-400 hover:bg-gray-700"
                  } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}

            {user?.profilePic ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-2">
                  <Image
                    className="h-8 w-8 rounded-full ring-2 ring-teal-500"
                    alt="Profile picture"
                    height={32}
                    width={32}
                    src={user.profilePic || "/pMoc.png"}
                  />
                  <span className="text-teal-300 font-medium">{user.username}</span>
                </div>
                <div className="border-t border-gray-700 my-2"></div>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium
                           text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                  className="flex w-full items-center space-x-2 px-3 py-2 rounded-md text-base font-medium
                           text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium
                         text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

