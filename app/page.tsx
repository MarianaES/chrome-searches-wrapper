"use client";

import { SetStateAction, useState } from "react";
import HeroSection from "./components/HeroSection";
import StatsDisplay from "./components/StatsDisplay";
import FileUpload from "./components/FileUpload";
import ActivityHeatmap from "./components/ActivityHeatMap";
import TopSearches from "./components/TopSearches";
import WrapUpFoot from "./components/WrapUpFoot";
import HowToGuide from "./components/HowToGuide";

export interface SearchData {
  processedData: DailyData[];
  stats: Stats;
  topSearches: SearchQuery[];
}

export interface DailyData {
  date: Date;
  dateString: string;
  value: number;
}

export interface Stats {
  totalVisits: number;
  totalDays: number;
  avgPerDay: number;
  maxDay: DailyData;
  minDay: DailyData;
}

export interface SearchQuery {
  query: string;
  count: number;
}

export interface GoogleTakeOutData {
  "Browser History": GoogleBrowserHistoryData[];
}

export interface GoogleBrowserHistoryData {
  favicon_url: string;
  page_transition_qualifier: string;
  title: string;
  url: string;
  time_usec: number;
  client_id: string;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [processedData, setProcessedData] = useState<DailyData[] | null>(null);
  const [topSearches, setTopSearches] = useState<SearchQuery[] | null>(null);
  console.log("Current stats state:", stats);
  const handleSuccess = (data: {
    stats: SetStateAction<Stats | null>;
    processedData: SetStateAction<DailyData[] | null>;
    topSearches: SetStateAction<SearchQuery[] | null>;
  }) => {
    if (data.stats) {
      setStats(data.stats);
    }
    if (data.processedData) {
      setProcessedData(data.processedData);
    }
    if (data.topSearches) {
      setTopSearches(data.topSearches);
    }
  };

  const handleError = (msg: string) => {
    console.error(msg);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <HeroSection />
      {!stats && (
        <>
          <FileUpload onSuccess={handleSuccess} onError={handleError} />

          <HowToGuide />
        </>
      )}
      {processedData && <ActivityHeatmap data={processedData} />}
      {stats && <StatsDisplay stats={stats} />}
      {topSearches && <TopSearches searches={topSearches} />}
      {stats && topSearches && (
        <WrapUpFoot stats={stats} topSearches={topSearches} />
      )}
    </div>
  );
}
