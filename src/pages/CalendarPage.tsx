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
    <div className="p-4 space-y-4 pb-20">
      <h1
        className="gradient-title text-2xl font-bold"
        style={{ fontFamily: "'LOTTERIA CHAB', sans-serif" }}
      >
        DreamWeaver
      </h1>
      <div className="card-container rounded-2xl p-4">
        <CalendarWidget
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          dreams={DUMMY_DREAMS}
        />
      </div>
      <div className="card-container rounded-2xl p-4">
        <MonthlyStats currentMonthDreams={DUMMY_DREAMS} />
      </div>
    </div>
  );
};

export default CalendarPage;
