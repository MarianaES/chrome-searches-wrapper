import { useMemo } from "react";

interface DayData {
  dateString: string;
  value: number;
}

interface ActivityHeatmapProps {
  data: DayData[];
  startDate?: string;
  endDate?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getColor = (count: number, maxCount: number): string => {
  if (count === 0) return "bg-gray-800/30";
  const intensity = count / maxCount;
  if (intensity < 0.25) return "bg-cyan-500/25";
  if (intensity < 0.5) return "bg-cyan-500/50";
  if (intensity < 0.75) return "bg-cyan-500/75";
  return "bg-cyan-500";
};

export const ActivityHeatmap = ({
  data,
  startDate = "2024-11-12",
  endDate = "2025-11-12",
}: ActivityHeatmapProps) => {
  const { weeks, monthLabels, maxCount } = useMemo(() => {
    const dataMap = new Map(data.map((d) => [d.dateString, d.value]));
    const start = new Date(startDate);
    const end = new Date(endDate);
    const weeks: { date: Date; count: number }[][] = [];
    let currentWeek: { date: Date; count: number }[] = [];
    const monthLabels: { month: string; weekIndex: number }[] = [];
    let maxCount = 0;

    // Pad to start on Sunday
    const startDay = start.getDay();
    for (let i = 0; i < startDay; i++) {
      currentWeek.push({ date: new Date(0), count: -1 });
    }

    let lastMonth = -1;
    let weekIndex = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const count = dataMap.get(dateStr) || 0;
      if (count > maxCount) maxCount = count;

      const currentMonth = d.getMonth();
      if (currentMonth !== lastMonth && d.getDay() <= 3) {
        monthLabels.push({ month: MONTHS[currentMonth], weekIndex });
        lastMonth = currentMonth;
      }

      currentWeek.push({ date: new Date(d), count });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
        weekIndex++;
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: new Date(0), count: -1 });
      }
      weeks.push(currentWeek);
    }

    return { weeks, monthLabels, maxCount };
  }, [data, startDate, endDate]);

  return (
    <div className="w-full px-4 py-8">
      <div className="overflow-x-auto overflow-y-hidden pb-4">
        <div className="min-w-fit mx-auto w-fit">
          {/* Month labels */}
          <div className="flex mb-4 ml-12 md:ml-16 relative h-6">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="text-xs md:text-sm text-gray-400 absolute font-medium"
                style={{
                  left: `${label.weekIndex * 14}px`,
                }}
              >
                {label.month}
              </div>
            ))}
          </div>

          <div className="flex">
            {/* Day labels */}
            <div className="hidden md:flex flex-col mr-3 gap-[3px] text-xs text-gray-400 w-12">
              {DAYS.map((day, i) => (
                <div key={i} className="h-[11px] leading-[11px]">
                  {i % 2 === 1 ? day : ""}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`w-[11px] h-[11px] rounded-sm ${
                        day.count === -1
                          ? "bg-transparent"
                          : getColor(day.count, maxCount)
                      } transition-all hover:ring-2 hover:ring-cyan-400 hover:scale-110 cursor-pointer`}
                      title={
                        day.count >= 0
                          ? `${day.date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}: ${day.count.toLocaleString()} visits`
                          : ""
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end mt-6 gap-3 text-xs text-gray-400">
            <span className="text-xs">Less</span>
            <div className="flex gap-1">
              <div className="w-[11px] h-[11px] rounded-sm bg-gray-800/30" />
              <div className="w-[11px] h-[11px] rounded-sm bg-cyan-500/25" />
              <div className="w-[11px] h-[11px] rounded-sm bg-cyan-500/50" />
              <div className="w-[11px] h-[11px] rounded-sm bg-cyan-500/75" />
              <div className="w-[11px] h-[11px] rounded-sm bg-cyan-500" />
            </div>
            <span className="text-xs">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
