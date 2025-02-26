"use client";
import React, { useState } from "react";
import { BarChart, Users, DollarSign } from "lucide-react";

function Dashboard() {
  const [stats] = useState({
    users: 1250,
    sessions: 320,
    revenue: 12540,
  });

  return (
    <div className="flex-1 p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold">Welcome, Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        <div className="bg-gray-800 shadow-md rounded-lg p-6 flex items-center gap-4">
          <Users className="w-12 h-12 text-blue-400" />
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Total Users</h2>
            <p className="text-3xl font-bold">{stats.users}</p>
          </div>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6 flex items-center gap-4">
          <BarChart className="w-12 h-12 text-green-400" />
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Active Sessions</h2>
            <p className="text-3xl font-bold">{stats.sessions}</p>
          </div>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6 flex items-center gap-4">
          <DollarSign className="w-12 h-12 text-yellow-400" />
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Revenue</h2>
            <p className="text-3xl font-bold">${stats.revenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
