import React, { useState } from "react";
import TimePicker from "../features/alarm/TimePicker";
import Switch from "../components/ui/Switch";

const AlarmPage: React.FC = () => {
  const [time, setTime] = useState({
    ampm: "오전",
    hour: "07",
    minute: "00",
  });
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="p-4 space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Alarm</h1>

      <div className="bg-white rounded-2xl shadow-sm border p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-lg">Daily Alarm</span>
          <Switch
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
        </div>

        <div
          className={`transition-opacity duration-300 ${
            isEnabled ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <TimePicker value={time} onChange={setTime} />
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">
        {isEnabled
          ? `Alarm set for ${time.ampm} ${time.hour}:${time.minute}`
          : "Alarm is disabled"}
      </div>
    </div>
  );
};

export default AlarmPage;
