"use client"

import { usePathname } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { createChapter } from "@/lib/action/chapter"
import { BookOpen, Save, Eye, CheckCircle, AlertCircle } from "lucide-react"

type Props = {
  accessToken: string
}

const CreateChapterForm: React.FC<Props> = ({ accessToken }) => {
  const pathname = usePathname()
  const pathParts = pathname.split("/").filter((part) => part)
  const bookId = pathParts[3]
  const [form, setForm] = useState({
    title: "",
    content: "",
    bookId: bookId || "",
    description: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [activeTab, setActiveTab] = useState("edit")

  const editor = useEditor({
    extensions: [StarterKit],
    content: form.content,
    onUpdate: ({ editor }) => {
      setForm((prevForm) => ({ ...prevForm, content: editor.getHTML() }))
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[250px] px-4",
      },
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const response = await createChapter(form, accessToken);
    if (response !== null) {
      setSuccessMessage("Chapter created successfully!");
      setForm({
          title: "",
          content: "",
          bookId: bookId || "",
          description: "",
      });
      editor?.commands.clearContent();
    } else {
      setErrorMessage("Failed to create chapter. Please try again.");
  
    }
};


  return (
    <div className="max-w-5xl ">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 p-6 rounded-t-2xl shadow-lg border border-violet-500/20">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create New Chapter</h1>
        </div>
        <p className="text-violet-100 mt-2 opacity-80">Craft your story with powerful formatting tools</p>
      </div>

      <div className="bg-gray-900 rounded-b-2xl shadow-2xl border border-gray-800">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="bookId" value={bookId} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Chapter Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block w-full p-3.5 transition-all duration-200"
                  placeholder="Enter chapter title..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Short Description</label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-xl focus:ring-violet-500 focus:border-violet-500 block w-full p-3.5 transition-all duration-200"
                  placeholder="Brief description of this chapter..."
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between  items-center mb-3">
                <label className="block text-sm font-medium text-gray-300">Chapter Content</label>
                <div className="flex  bg-gray-800 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("edit")}
                    className={`px-4 py-1.5 text-sm rounded-md transition-all duration-200 ${
                      activeTab === "edit"
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`px-4 py-1.5 text-sm rounded-md flex items-center gap-1.5 transition-all duration-200 ${
                      activeTab === "preview"
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </button>
                </div>
              </div>

              {activeTab === "edit" ? (
                <div className="border border-gray-700 rounded-xl bg-gray-800 overflow-hidden">
                  <div className="border-b border-gray-700 bg-gray-800 px-4 py-2 flex items-center">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <EditorContent editor={editor} className="min-h-[300px] text-gray-300" />
                  </div>
                </div>
              ) : (
                <div className="border border-gray-700 text-gray-300 rounded-xl bg-gray-800 p-6 min-h-[300px] prose prose-invert max-w-none">
                  {form.content ? (
                    <div dangerouslySetInnerHTML={{ __html: form.content }} />
                  ) : (
                    <p className="text-gray-500 italic">Preview will appear here...</p>
                  )}
                </div>
              )}
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-400 rounded-xl flex items-center animate-fadeIn">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-400 rounded-xl flex items-center animate-fadeIn">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded-xl shadow-lg shadow-violet-500/30 transition-all duration-200 hover:translate-y-[-2px]"
              >
                <Save className="h-4 w-4" />
                Save Chapter
              </button>
            </div>
          </form>
        </div>

        {form.title && (
          <div className="border-t border-gray-800 bg-gray-900/50 p-6 rounded-b-xl backdrop-blur-sm">
            <h3 className="text-lg font-medium text-gray-200 mb-3">Chapter Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-1">Title</p>
                <p className="font-medium text-gray-100">{form.title}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-1">Description</p>
                <p className="font-medium text-gray-100">{form.description || "No description provided"}</p>
              </div>
              <div className="md:col-span-2 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-1">Content Stats</p>
                <div className="flex items-center gap-4">
                  <p className="font-medium text-gray-100">
                    {form.content ? `${form.content.replace(/<[^>]*>/g, "").length} characters` : "No content yet"}
                  </p>
                  {form.content && (
                    <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                        style={{ width: `${Math.min(100, form.content.replace(/<[^>]*>/g, "").length / 20)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateChapterForm

