"use client";

import { createGenre } from "@/lib/action/genre";
import { useState } from "react";

export default function AddGenreForm({ accessToken }: { accessToken: string }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await createGenre(formData.name, formData.description, accessToken);

      if (res === 200) {
        setSuccess("Genre added successfully!");
        setFormData({ name: "", description: "" });
      } else {
        throw new Error("Failed to add genre.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-sm bg-gradient-to-b from-gray-900/90 to-black/90 p-8 rounded-2xl shadow-lg border border-gray-800">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Add New Genre
          </h2>
          <p className="text-gray-400 text-sm">Enter the details of the new genre you want to add</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Genre Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter genre name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl 
                         text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                         transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter genre description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl 
                         text-gray-100 placeholder-gray-500 resize-none
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                         transition-all duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl
                        font-medium transform transition-all duration-300 ease-in-out
                        ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"}
                        focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
                        active:scale-[0.98] shadow-[0_0_15px_rgba(168,85,247,0.2)]`}
          >
            {loading ? "Adding..." : "Add Genre"}
          </button>
        </form>
      </div>
    </div>
  );
}
