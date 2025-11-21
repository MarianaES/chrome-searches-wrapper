"use client";

import { ChangeEvent } from "react";
import {
  DailyData,
  GoogleBrowserHistoryData,
  GoogleTakeOutData,
  Stats,
} from "../page";

function FileUpload({
  onError,
  onSuccess,
}: {
  onError: (msg: string) => void;
  onSuccess: (data: { processedData: DailyData[]; stats: Stats }) => void;
}) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      try {
        const jsonData = JSON.parse(content as string);
        processHistoryData(jsonData);
      } catch (err) {
        onError(
          `Error parsing JSON file: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      }
    };
    reader.readAsText(file);
  };

  const processHistoryData = (data: GoogleTakeOutData) => {
    try {
      const browserHistory = data["Browser History"] || [];

      if (!browserHistory.length) {
        onError("No browsing history found in the uploaded file.");
        return;
      }

      const dailyCount: Record<string, number> = {};
      browserHistory.forEach((entry: GoogleBrowserHistoryData) => {
        if (!entry.time_usec) return;

        // Covert Chrome timestamp to JS Date (microseconds to milliseconds)
        const date = new Date(entry.time_usec / 1000);
        const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format

        dailyCount[dateKey] = (dailyCount[dateKey] || 0) + 1;
      });

      const processedData = Object.entries(dailyCount)
        .map(([dateString, count]) => ({
          date: new Date(dateString),
          dateString: dateString,
          value: count,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      if (processedData.length === 0) {
        onError("No valid browsing history entries found.");
        return;
      }

      const totalDays = processedData.length;
      const avgPerDay = Math.round(browserHistory.length / totalDays);
      const maxDay = processedData.reduce(
        (max, d) => (d.value > max.value ? d : max),
        processedData[0]
      );
      const minDay = processedData.reduce(
        (min, d) => (d.value < min.value ? d : min),
        processedData[0]
      );

      const stats = {
        totalVisits: browserHistory.length,
        totalDays,
        avgPerDay,
        maxDay,
        minDay,
      };

      onSuccess({ processedData, stats });
    } catch (err) {
      onError(
        `Error processing browsing history data: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };
  return (
    <div className="bg-gray-800 rounded-xl p-8 border-2 border-dashed border-gray-600 text-center">
      <label htmlFor="fileInput" className="cursor-pointer">
        <div className="inline-block bg-gradient-to-r from-cyan-400 to-teal-500 hover:opacity-90 transition-opacity px-6 py-3 rounded-lg font-medium text-gray-900 text-sm">
          Upload Browser History JSON
        </div>
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-gray-400 text-sm mt-4">
        Upload your Chrome history JSON file to visualize your browsing patterns
      </p>
    </div>
  );
}

export default FileUpload;
