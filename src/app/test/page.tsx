"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

export default function FileUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setUploadStatus(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setUploadStatus({
        success: false,
        message: "Please select a file to upload",
      })
      return
    }

    setIsUploading(true)
    setUploadStatus(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/fileUpload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setUploadStatus({
          success: true,
          message: "File uploaded successfully!",
        })
        // Reset file input
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        setUploadStatus({
          success: false,
          message: data.message || "Failed to upload file",
        })
      }
    } catch (error) {
      setUploadStatus({
        success: false,
        message: "An error occurred while uploading the file",
      })
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-2xl font-bold text-gray-800">File Upload</h2>
          <p className="text-sm text-gray-600">Upload a file to the server</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    {file ? file.name : "Click to select a file or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{file ? `${(file.size / 1024).toFixed(2)} KB` : ""}</p>
                  <input title="file" ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                </div>
              </div>
            </div>

            {uploadStatus && (
              <div
                className={`p-4 rounded-md ${
                  uploadStatus.success
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {uploadStatus.success ? (
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{uploadStatus.success ? "Success" : "Error"}</h3>
                    <div className="mt-1 text-sm">{uploadStatus.message}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isUploading || !file ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isUploading || !file}
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

