"use client"

import { UserInterface } from "@/types/user"
import type React from "react"
import Image from "next/image"
import { useEdgeStore } from "@/lib/edgeStore"

import { useState, useEffect } from "react"
import { updateProfile } from "@/lib/action/user"
import { set } from "zod"

interface profileProps {
    users: UserInterface
    accessToken: string
}

export default function ProfileCard({users,accessToken}:profileProps) {
  const [user, setUser] = useState(users)
  const [newUsername, setNewUsername] = useState(user.username)
  const [newName, setNewName] = useState(user.name)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const { edgestore } = useEdgeStore()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSave =async () => {
    setUser((prevUser) => ({
      ...prevUser,
      username: newUsername,
      name: newName,
    }))
    try{
      if(file){
        const upload = await edgestore.myPublicImage.upload({file})

        
      const newData = {
        name: newName,
        profilePic: upload.url
      }
      const res = updateProfile(newData, user.id, accessToken)
      if(res !== null){
        console.log("Profile updated")
        setSuccess(true)
        setError(false)
      }else{
        console.error("error in updateProfile")
        setError(true)
        setSuccess(false)
      }
    }
    }catch(error){
      console.error("error in handleSave")
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePic: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`w-full max-w-md ${isDarkMode ? "dark" : ""}`}>
      <div className="backdrop-blur-lg bg-white/10 dark:bg-black/30 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white dark:text-gray-100">Profile</h2>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
          </div>
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-white dark:ring-gray-800 shadow-lg">
                  <Image
                  width={300}
                    height={300}
                    src={user.profilePic || "/placeholder.svg"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="imageInput"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                >
                  Change Picture
                </label>
                <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    className="w-full bg-white/10 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-400 dark:text-gray-500 cursor-not-allowed" value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    className="w-full bg-white/20 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-white dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    className="w-full bg-white/10 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    value={user.email}
                    disabled
                  />
                </div>
              </div>

              {success && (
                <p className="text-green-500 text-center mt-4">Profile updated successfully</p>
              )}
              {error && (
                <p className="text-red-500 text-center mt-4">Error updating profile</p>
              )}
            <div className="px-8 py-4  mt-4">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-black to-zinc-800 hover:from-zinc-800 hover:to-black text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
            </>
          )}
        </div>
   
      </div>
    </div>
  )
}

