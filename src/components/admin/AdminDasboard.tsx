"use client";

import { BarChartIcon, Users, DollarSign, Book, Link2Icon, Bookmark } from "lucide-react";
import { IoPaperPlaneSharp } from "react-icons/io5";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DashboardProps {
  userData: { id: string; username: string; email: string; role?: string }[];
  chapterData: { id: string; title: string; bookId: string; createdAt: string }[];
  genreData: { id: string; title: string }[];
  sessionData: [];
  bookmarkData: { bookId: string }[];
  bookData: { id: string; title: string; genreId: number; genre: { id: string }[] }[];
}

export default function Dashboard({
  userData = [],
  chapterData = [],
  genreData = [],
  sessionData = [],
  bookmarkData = [],
  bookData = [],
}: DashboardProps) {
  const revenue = bookData.length * 5.99;


  const genreDistribution =
    genreData.map((genre) => ({
      name: genre.title,
      value: bookData.filter((book) =>
        book.genre.some((g) => g.id === genre.id)
      ).length,
    })) || [];


  const chapterActivityData = chapterData.reduce((acc, chapter) => {
    const month = new Date(chapter.createdAt).toLocaleString("en-US", { month: "short" });
    const found = acc.find((item) => item.name === month);
    if (found) {
      found.chapters += 1;
    } else {
      acc.push({ name: month, chapters: 1 });
    }
    return acc;
  }, [] as { name: string; chapters: number }[]);

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  chapterActivityData.sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">     
        <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{userData.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">

          <div className="flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <BarChartIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Sessions</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{sessionData.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">

          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
              <DollarSign className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">${revenue.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Genre Distribution */}
  <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 mb-3 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Genre Distribution</h3>
    <div className="mt-4" style={{ width: "100%", height: 350 }}>
      {genreDistribution.length > 0 ? (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={genreDistribution}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            >
              {genreDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>Tidak ada data genre yang tersedia.</p>
      )}
    </div>
  </div>

  {/* Statistik */}
  <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-6">
    <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
          <Book className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Book</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{bookData.length}</h3>
        </div>
      </div>
    </div>

    {/* Total Chapter */}
    <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
          <IoPaperPlaneSharp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Chapter</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{chapterData.length}</h3>
        </div>
      </div>
    </div>

    {/* Total Bookmark */}
    <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
          <Bookmark className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Bookmark</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{bookmarkData.length}</h3>
        </div>
      </div>
    </div>

    {/* Total Bookmark (Duplicate) */}
    <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
          <Link2Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Genre</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{genreData.length}</h3>
        </div>
      </div>
    </div>
  </div>
</div>


      <div className="bg-gray-300 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chapter Activity</h3>
      <div className="mt-4" style={{ width: "100%", height: 300 }}>
        {chapterActivityData.length > 0 ? (
          <ResponsiveContainer>
            <LineChart data={chapterActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Line type="monotone" dataKey="chapters" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-600">Tidak ada data chapter yang tersedia.</p>
        )}
      </div>
    </div>
    </div>
  );
}
