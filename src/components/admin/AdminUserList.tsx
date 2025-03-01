"use client";

import { useState, useEffect } from "react";
import { User, Search, ArrowLeft, Plus } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserInterface } from "@/types/user";



export default function UserManagement({ users }: any) {

  const { data: session } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>(users);

  useEffect(() => {
    const results = users.filter((user:UserInterface) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="flex items-center text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2" size={20} /> Back to Users
        </button>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <User className="mr-3" size={28} /> User Management
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link href={`/dashboard/user/create`} className="inline-flex items-center px-4 py-2 bg-violet-600 rounded-md text-white">
          <Plus className="mr-2 h-5 w-5" /> Add New User
        </Link>
        <div className="relative flex-grow max-w-md">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
              <p className="text-gray-400">{user.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8">No Users Found</div>
      )}
    </div>
  );
}
