"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import StatsDisplay from "@/app/components/StatsDisplay";
import TopSearches from "@/app/components/TopSearches";
import { Stats } from "@/app/page";
import { SearchQuery } from "@/app/components/FileUpload";

interface SharedData {
  totalVisits: number;
  totalDays: number;
  avgPerDay: number;
  maxDay: {
    dateString: string;
    value: number;
  };
  topSearches: SearchQuery[];
}

export default function SharedPage() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get("data") ?? null;

  // URL-safe base64 decode
  const urlSafeBase64Decode = (str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    return atob(base64);
  };

  const { sharedData, error } = useMemo(() => {
    if (!encoded) {
      return { sharedData: null, error: "Missing share link data" };
    }

    try {
      const decoded = urlSafeBase64Decode(encoded);
      const data = JSON.parse(decoded) as SharedData;
      return { sharedData: data, error: null };
    } catch (err) {
      console.error("Failed to decode shared data:", err);
      return { sharedData: null, error: "Invalid share link" };
    }
  }, [encoded]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Oops!</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90 transition-opacity px-6 py-3 rounded-lg font-semibold text-black"
          >
            Create Your Own Wrapped
          </Link>
        </div>
      </div>
    );
  }

  if (!sharedData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  const stats: Stats = {
    totalVisits: sharedData.totalVisits,
    totalDays: sharedData.totalDays,
    avgPerDay: sharedData.avgPerDay,
    maxDay: {
      date: new Date(sharedData.maxDay.dateString),
      dateString: sharedData.maxDay.dateString,
      value: sharedData.maxDay.value,
    },
    minDay: {
      date: new Date(),
      dateString: "",
      value: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="text-center pt-16 pb-8">
        <h1 className="text-[clamp(40px,15vw,72px)] font-black leading-none mb-8 text-center bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 bg-clip-text text-transparent">
          2025 Wrapped
        </h1>
        <p className="text-gray-400 text-lg">
          Someone shared their year in browsing!
        </p>
      </div>
      <StatsDisplay stats={stats} />
      {sharedData.topSearches.length > 0 && (
        <TopSearches searches={sharedData.topSearches} />
      )}
      <div className="text-center py-16">
        <p className="text-gray-400 mb-6">Want to create your own?</p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90 transition-opacity px-8 py-4 rounded-full font-semibold text-lg text-black"
        >
          Create Your Wrapped
        </Link>
      </div>
    </div>
  );
}
