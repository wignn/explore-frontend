"use client"

import { apiRequest } from "@/lib/Request"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { FaCheckCircle, FaEnvelope, FaArrowLeft } from "react-icons/fa"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    try {
      setIsLoading(true)
      const res = await apiRequest({
        endpoint:`/auth/password/verify`,
        method: "POST",
        body: email
      })
      if (res !== null) {
        setError("Failed to verify email")
      } else {
        setSuccess("Password reset link sent to your email")
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 w-full min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/90 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm transition-all duration-300 hover:shadow-blue-900/10"
        >
          <Link
            href="/login"
            className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors mb-6 group"
          >
            <FaArrowLeft className="mr-2 text-sm group-hover:translate-x-[-2px] transition-transform" />
            <span className="text-sm">Back to login</span>
          </Link>

          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-5 rounded-full shadow-lg shadow-blue-600/30 relative overflow-hidden group">
              <FaEnvelope className="text-white text-3xl relative z-10" />
              <div className="absolute inset-0 bg-blue-500 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-full"></div>
            </div>
          </div>

          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2 text-center">Forgot Password</h1>
          <p className="text-gray-400 text-center mb-8 text-sm sm:text-base">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6 animate-pulse">
              <p className="text-center text-sm sm:text-base">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded-lg mb-6 flex items-center justify-center">
              <FaCheckCircle className="mr-2 text-green-400" />
              <p className="text-center text-sm sm:text-base">{success}</p>
            </div>
          )}

          <div className="space-y-5 mb-8">
            <div>
              <label htmlFor="email" className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">
                Email Address
              </label>
              <div className="flex items-center border border-gray-600 p-3 rounded-lg bg-gray-700/50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  id="email"
                  type="email"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-500 text-sm sm:text-base"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg text-sm sm:text-base font-semibold transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="relative z-10">{isLoading ? "Sending..." : "Reset Password"}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>

        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] h-2 bg-blue-900/20 blur-xl rounded-full"></div>
      </div>
    </div>
  )
}

