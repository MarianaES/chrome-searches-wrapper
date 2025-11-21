"use client";

import HeroSection from "./components/HeroSection";

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
  return (
    <>
      <HeroSection />
      {/* <StatsDisplay stats={stats} /> */}
    </>
  );
}
