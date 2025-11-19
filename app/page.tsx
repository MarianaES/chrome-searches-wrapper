"use client";

import FileUpload from "./components/FileUpload";

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
  const handleSuccess = (data: any) => {
    console.log("Browsing history data:", data);
    // Further processing can be done here
  };

  const handleError = (msg: string) => {
    console.error(msg);
    // Error handling can be done here
  };

  return <FileUpload onSuccess={handleSuccess} onError={handleError} />;
}
