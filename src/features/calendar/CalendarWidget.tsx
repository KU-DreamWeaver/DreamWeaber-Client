import React from "react";
import Calendar from "react-calendar";
import { format, isSameDay, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DreamRecord, EmotionType } from "../../types/dream";
import "react-calendar/dist/Calendar.css";
import "./CalendarWidget.css";

interface CalendarWidgetProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  dreams: DreamRecord[];
}

const EMOTION_COLORS: Record<EmotionType, string> = {
  JOY: "bg-[var(--primary)]",
  SAD: "bg-[var(--secondary)]",
  ANGRY: "bg-red-400",
  FEAR: "bg-purple-500",
  MUMBLE: "bg-gray-400",
};

const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  selectedDate,
  onDateChange,
  dreams,
}) => {
  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const dream = dreams.find((d) => isSameDay(parseISO(d.createdAt), date));

    if (dream) {
      return (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              EMOTION_COLORS[dream.emotion]
            }`}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            onDateChange(value);
          } else if (Array.isArray(value) && value[0] instanceof Date) {
            onDateChange(value[0]);
          }
        }}
        value={selectedDate}
        formatDay={(_, date) => format(date, "d")}
        prevLabel={
          <ChevronLeft size={20} className="text-[var(--secondary)]" />
        }
        nextLabel={
          <ChevronRight size={20} className="text-[var(--secondary)]" />
        }
        prev2Label={null}
        next2Label={null}
        tileContent={getTileContent}
        className="w-full border-none font-sans"
        locale="ko-KR"
      />
    </div>
  );
};

export default CalendarWidget;
