"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"
import axios from "axios"
import { API_URL } from "@/lib/API"

function RegisterForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (!email || !username || !password) {
      setError("Please fill all input fields before proceeding")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, { email, username, password, name: username })
      if (response.data.data !== null && response.data.data !== undefined) {
        setSuccess("Registration successful!")
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
      } else if (response.status === 409) {
        setError("Registration failed. username or email already exists")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-gray-800 dark:bg-gray-800 shadow-2xl rounded-3xl p-8 space-y-8">
          <div className="text-center">
            <div className="bg-blue-600 inline-flex p-4 dark:bg-blue-900 rounded-full mb-4">
              <FaUser className=" text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="mt-2 text-white ">Join us today and start your journey!</p>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
              <p>{success}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className='flex items-center border border-gray-600 p-3 rounded-lg bg-gray-700/50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200'>
                <FaEnvelope className='text-gray-400 mr-3' />
                <input
                  type='text'
                  className='w-full bg-transparent outline-none text-white placeholder-gray-500 text-sm sm:text-base'
                  placeholder='Enter your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>

              <div className='flex items-center border border-gray-600 p-3 rounded-lg bg-gray-700/50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200'>
                <FaUser className='text-gray-400 mr-3' />
                <input
                  type='text'
                  className='w-full bg-transparent outline-none text-white placeholder-gray-500 text-sm sm:text-base'
                  placeholder='Enter your username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className='flex items-center border border-gray-600 p-3 rounded-lg bg-gray-700/50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200'>
                <FaLock className='text-gray-400 mr-3' />
                <input
                  type='text'
                  className='w-full bg-transparent outline-none text-white placeholder-gray-500 text-sm sm:text-base'
                  placeholder='Enter your username'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm

