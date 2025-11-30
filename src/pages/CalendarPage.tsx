import React, { useState } from "react";
import CalendarWidget from "../features/calendar/CalendarWidget";
import MonthlyStats from "../features/calendar/MonthlyStats";
import DreamCard from "../components/dream/DreamCard";
import DreamDetailModal from "../components/dream/DreamDetailModal";
import { useDreamsQuery } from "../hooks/queries/useDream";
import type { DreamRecord } from "../types/dream";
import { format } from "date-fns";

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDream, setSelectedDream] = useState<DreamRecord | null>(null);

  // Fetch dreams for the current month (using dummy data for now)
  const { data: response } = useDreamsQuery();
  const dreams = response?.data || [];
  const dreamsForCurrentMonth = dreams.filter(
    (dream) =>
      format(new Date(dream.createdAt), "yyyy-MM") ===
      format(selectedDate, "yyyy-MM")
  );
  // Find dreams for selected date
  const dreamsForSelectedDate = dreams.filter(
    (dream) =>
      format(new Date(dream.createdAt), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="p-6 space-y-8 h-full pb-24 overflow-y-auto flex flex-col">
      {/* Calendar Section */}
      <div className="glass-panel rounded-4xl p-6 transition-all duration-300 hover:shadow-lg bg-white/40">
        <CalendarWidget
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          dreams={dreams}
        />
      </div>

      {/* Analysis Section */}
      <MonthlyStats currentMonthDreams={dreamsForCurrentMonth} />

      {/* Selected Dream Cards */}
      {dreamsForSelectedDate.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-bold text-gray-800">
              {format(selectedDate, "M월 d일")}의 꿈
            </h3>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-600">
              {dreamsForSelectedDate.length}개의 기록
            </span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-hide">
            {dreamsForSelectedDate.map((dream) => (
              <div
                key={dream.id}
                className={`snap-center shrink-0 ${
                  dreamsForSelectedDate.length > 1 ? "w-[85%]" : "w-full"
                }`}
              >
                <DreamCard
                  dream={dream}
                  onClick={() => setSelectedDream(dream)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <DreamDetailModal
        dream={selectedDream}
        onClose={() => setSelectedDream(null)}
      />
    </div>
  );
};

export default CalendarPage;
