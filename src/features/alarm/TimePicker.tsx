import React from "react";
import Picker from "react-mobile-picker";

interface TimeState {
  ampm: string;
  hour: string;
  minute: string;
}

interface TimePickerProps {
  value: TimeState;
  onChange: (value: TimeState) => void;
}

const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);
const AMPM = ["오전", "오후"];

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  return (
    <div className="relative h-[180px] w-full overflow-hidden rounded-xl">
      {/* Top Overlay */}
      <div className="absolute top-0 w-full h-[35%] bg-gradient-to-b from-[var(--card-bg)] to-transparent pointer-events-none z-10" />

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 w-full h-[35%] bg-gradient-to-t from-[var(--card-bg)] to-transparent pointer-events-none z-10" />

      {/* Highlight Bar */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[40px] bg-[var(--primary-light)] -z-10 rounded-lg" />

      {/* Picker */}
      <Picker
        value={value as unknown as Record<string, string>}
        onChange={(newValue) => onChange(newValue as unknown as TimeState)}
        wheelMode="normal"
        height={180}
        itemHeight={40}
      >
        <Picker.Column name="ampm">
          {AMPM.map((option) => (
            <Picker.Item key={option} value={option}>
              {({ selected }) => (
                <div
                  className={`flex items-center justify-center h-[40px] transition-colors ${
                    selected
                      ? "font-bold text-[var(--primary)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {option}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="hour">
          {HOURS.map((option) => (
            <Picker.Item key={option} value={option}>
              {({ selected }) => (
                <div
                  className={`flex items-center justify-center h-[40px] transition-colors ${
                    selected
                      ? "font-bold text-[var(--primary)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {option}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="minute">
          {MINUTES.map((option) => (
            <Picker.Item key={option} value={option}>
              {({ selected }) => (
                <div
                  className={`flex items-center justify-center h-[40px] transition-colors ${
                    selected
                      ? "font-bold text-[var(--primary)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {option}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
};

export default TimePicker;
