"use client"

import type React from "react"

import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Send, BookOpen } from "lucide-react"

function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,200,200,0.05),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,200,200,0.05),transparent_70%)]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left"
          >
            <div className="mb-4 flex items-center gap-2 sm:mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Wign</h2>
            </div>
            <p className="mb-6 max-w-xs text-sm text-gray-400 sm:text-base">
              Your gateway to endless stories and adventures. Discover, read, and immerse yourself in a world of
              captivating narratives.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors duration-300 hover:bg-teal-500 hover:text-white sm:h-10 sm:w-10"
                aria-label="Facebook"
              >
                <FaFacebook size={16} className="sm:text-lg" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors duration-300 hover:bg-teal-500 hover:text-white sm:h-10 sm:w-10"
                aria-label="Twitter"
              >
                <FaTwitter size={16} className="sm:text-lg" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors duration-300 hover:bg-teal-500 hover:text-white sm:h-10 sm:w-10"
                aria-label="Instagram"
              >
                <FaInstagram size={16} className="sm:text-lg" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors duration-300 hover:bg-teal-500 hover:text-white sm:h-10 sm:w-10"
                aria-label="GitHub"
              >
                <FaGithub size={16} className="sm:text-lg" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links - Visible on mobile but in a different order */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-3 mt-2 flex flex-col items-center text-center sm:order-2 sm:mt-0 sm:items-start sm:text-left lg:order-2"
          >
            <h3 className="mb-4 text-base font-semibold text-white sm:mb-6 sm:text-lg">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-3">
              {["Home", "Browse", "Categories", "New Releases", "Popular"].map((link, index) => (
                <motion.li key={index} variants={item}>
                  <Link
                    href="#"
                    className="group flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-teal-400 sm:text-base"
                  >
                    <ArrowRight className="mr-1 h-3 w-0 opacity-0 transition-all duration-300 group-hover:w-3 group-hover:opacity-100 sm:mr-2" />
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-4 mt-2 flex flex-col items-center text-center sm:order-3 sm:mt-0 sm:items-start sm:text-left lg:order-3"
          >
            <h3 className="mb-4 text-base font-semibold text-white sm:mb-6 sm:text-lg">Company</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-3">
              {["About Us", "Contact", "Careers", "Privacy Policy", "Terms of Service"].map((link, index) => (
                <motion.li key={index} variants={item}>
                  <Link
                    href="#"
                    className="group flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-teal-400 sm:text-base"
                  >
                    <ArrowRight className="mr-1 h-3 w-0 opacity-0 transition-all duration-300 group-hover:w-3 group-hover:opacity-100 sm:mr-2" />
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter - Full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="order-2 mt-6 flex flex-col items-center text-center sm:order-4 sm:col-span-2 sm:mt-8 lg:col-span-1 lg:items-start lg:text-left"
          >
            <h3 className="mb-4 text-base font-semibold text-white sm:mb-6 sm:text-lg">Stay Updated</h3>
            <p className="mb-4 max-w-xs text-sm text-gray-400 sm:text-base">
              Subscribe to our newsletter for the latest updates and releases.
            </p>

            <form onSubmit={handleSubscribe} className="w-full max-w-xs">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full rounded-full border border-gray-700 bg-gray-800 px-4 py-2 pr-10 text-xs text-gray-300 placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:py-3 sm:text-sm"
                  required
                />

                <button
                  title="Subscribe"
                  type="submit"
                  className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white transition-transform hover:scale-105 sm:h-8 sm:w-8"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </form>

            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-teal-400 sm:text-sm"
              >
                Thanks for subscribing!
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent sm:my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="text-xs text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} Wign. All rights reserved. by{" "}
            <Link href="#" className="text-teal-400 transition-colors duration-300 hover:text-teal-300">
              Wign
            </Link>
          </div>

          <div className="flex space-x-4 text-xs text-gray-500 sm:space-x-6 sm:text-sm">
            <Link href="#" className="hover:text-teal-400">
              Privacy
            </Link>
            <Link href="#" className="hover:text-teal-400">
              Terms
            </Link>
            <Link href="#" className="hover:text-teal-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

