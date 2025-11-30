import React, { useState } from "react";
import CalendarWidget from "../features/calendar/CalendarWidget";
import MonthlyStats from "../features/calendar/MonthlyStats";
import type { DreamRecord } from "../types/dream";

// Dummy data for demonstration
const DUMMY_DREAMS: DreamRecord[] = [
  {
    id: 1,
    userId: 1,
    keywords: ["flying", "sky"],
    description: "I was flying in the sky.",
    emotion: "JOY",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    keywords: ["monster", "dark"],
    description: "A monster chased me.",
    emotion: "FEAR",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 3,
    userId: 1,
    keywords: ["exam", "fail"],
    description: "I failed my exam.",
    emotion: "SAD",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
];

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-6 space-y-12 h-full pb-24 overflow-y-auto flex flex-col gap-[25px]">
      <div className="glass-panel rounded-[32px] p-6 transition-all duration-300 hover:shadow-lg bg-white/40">
        <CalendarWidget
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          dreams={DUMMY_DREAMS}
        />
      </div>
      <MonthlyStats currentMonthDreams={DUMMY_DREAMS} />
    </div>
  );
};

export default CalendarPage;
