"use client";

import { Stats } from "../page";

interface StatsDisplayProps {
  stats: Stats | null;
}

function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="text-gray-400 text-sm mb-2">Total Visits</div>
        <div className="text-3xl font-bold">{stats?.totalVisits}</div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="text-gray-400 text-sm mb-2">Active Days</div>
        <div className="text-3xl font-bold">{stats?.totalDays}</div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="text-gray-400 text-sm mb-2">Daily Average</div>
        <div className="text-3xl font-bold">{stats?.avgPerDay}</div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="text-gray-400 text-sm mb-2">Most Active Day</div>
        <div className="text-3xl font-bold">{stats?.maxDay.value}</div>
        <div className="text-gray-600 text-xs mt-1">
          {stats?.maxDay.dateString}
        </div>
      </div>
    </div>
  );
}

export default StatsDisplay;
