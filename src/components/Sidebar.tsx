"use client";

import { useState } from "react";
import { BarChartIcon, Users, BookOpen, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2Icon } from "lucide-react";

const navItems = [
  { path: "/dasboard", icon: BarChartIcon, label: "Dashboard" },
  { path: "/dasboard/user", icon: Users, label: "Users" },
  { path: "/dasboard/book", icon: BookOpen, label: "Books" },
  { path: "/dasboard/genre", icon: Link2Icon, label: "Genre" },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className={`bg-gray-800 text-white border-r border-gray-700 ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <h2 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>Admin Panel</h2>
        <button className="p-2 rounded-md hover:bg-gray-700 transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`w-full flex items-center p-2 rounded-md transition-colors ${
                    isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 text-gray-300 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
          <LogOut className="mr-2 h-5 w-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
