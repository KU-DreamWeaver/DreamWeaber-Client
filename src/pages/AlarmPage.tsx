import React from "react";
import TimePicker from "../features/alarm/TimePicker";
import { useAlarmStore } from "../store/useAlarmStore";
import toast from "react-hot-toast";
import { Bell, BellOff } from "lucide-react";

const AlarmPage: React.FC = () => {
  const { alarmTime, isEnabled, setAlarmTime, setIsEnabled } = useAlarmStore();

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        toast.error("알림 권한을 허용해야 알람을 받을 수 있어요");
        setIsEnabled(false);
        return;
      }
    }

    setIsEnabled(checked);
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Alarm</h1>

      {/* Status Card */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 text-center transition-all duration-500 ${
          isEnabled
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
          {isEnabled ? (
            <>
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm mb-2">
                <Bell size={32} className="text-white animate-pulse" />
              </div>
              <p className="text-sm font-medium opacity-90">Alarm is ON</p>
              <h2 className="text-4xl font-bold tracking-tight">
                {alarmTime.ampm} {alarmTime.hour}:{alarmTime.minute}
              </h2>
              <p className="text-xs opacity-75">
                You will be notified at this time
              </p>
            </>
          ) : (
            <>
              <div className="p-3 bg-gray-200 rounded-full mb-2">
                <BellOff size={32} className="text-gray-400" />
              </div>
              <p className="text-sm font-medium">Alarm is OFF</p>
              <h2 className="text-4xl font-bold tracking-tight text-gray-300">
                -- : --
              </h2>
              <p className="text-xs opacity-75">
                Tap the button below to set an alarm
              </p>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Set Time</h3>
          <p className="text-sm text-gray-500">
            Scroll to pick your wake-up time
          </p>
        </div>

        <div className="py-2">
          <TimePicker
            value={alarmTime}
            onChange={(newTime) => {
              setAlarmTime(newTime);
              if (!isEnabled) {
                setIsEnabled(true);
                toast.success("Alarm activated!", { icon: "⏰" });
                // Request permission if not granted
                if (Notification.permission !== "granted") {
                  Notification.requestPermission();
                }
              }
            }}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            if (!isEnabled) {
              // Turn ON
              handleToggle({
                target: { checked: true },
              } as React.ChangeEvent<HTMLInputElement>);
              toast.success("Alarm activated!", { icon: "⏰" });
            } else {
              // Turn OFF
              handleToggle({
                target: { checked: false },
              } as React.ChangeEvent<HTMLInputElement>);
              toast.success("Alarm deactivated");
            }
          }}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 ${
            isEnabled
              ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
              : "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90"
          }`}
        >
          {isEnabled ? "Turn Off Alarm" : "Set Alarm"}
        </button>
      </div>
    </div>
  );
};

export default AlarmPage;
