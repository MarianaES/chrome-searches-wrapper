"use client";

import { Stats } from "../page";
import { Search, Calendar, TrendingUp, Sparkles } from "lucide-react";

interface StatsDisplayProps {
  stats: Stats | null;
}

function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="w-full px-4 py-16">
      <h2 className="text-[clamp(32px,8vw,48px)] font-black text-center mb-4">
        Your Year in Numbers
      </h2>
      <p className="text-[clamp(16px, 3vw, 20px)] text-gray-400 text-center mb-12">
        The stats that defined your search journey
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="bg-gray-800 rounded-xl p-8 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 relative group">
          <div className="flex justify-between items-start mb-6">
            <div className="text-gray-400 text-base">Total Visits</div>
            <Search className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-5xl font-bold">
            {stats?.totalVisits.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 relative group">
          <div className="flex justify-between items-start mb-6">
            <div className="text-gray-400 text-base mb-3">Active Days</div>
            <Calendar className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-5xl font-bold">
            {stats?.totalDays.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 relative group">
          <div className="flex justify-between items-start mb-6">
            <div className="text-gray-400 text-base mb-3">Daily Average</div>
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-5xl font-bold">
            {stats?.avgPerDay.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 relative group">
          <div className="flex justify-between items-start mb-6">
            <div className="text-gray-400 text-base mb-3">Most Active Day</div>
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-5xl font-bold">
            {stats?.maxDay.value.toLocaleString()}
          </div>
          <div className="text-gray-600 text-sm mt-2">
            {stats?.maxDay.dateString}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsDisplay;
