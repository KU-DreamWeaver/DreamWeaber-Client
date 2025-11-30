import React from "react";
import TimePicker from "../features/alarm/TimePicker";
import { useAlarmStore } from "../store/useAlarmStore";
import toast from "react-hot-toast";
import { Bell, BellOff, Clock } from "lucide-react";

const AlarmPage: React.FC = () => {
  const { alarmTime, isEnabled, setAlarmTime, setIsEnabled } = useAlarmStore();

  const handleToggle = async (checked: boolean) => {
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
    <div className="p-6 space-y-6 pb-24 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-md shadow-sm">
          <Clock size={28} className="text-[#8E2DE2]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1e293b] tracking-tight">
          기상 알람
        </h2>
      </div>

      {/* Main Status Card */}
      <div className="glass-card rounded-4xl p-8 relative overflow-hidden transition-all duration-500 shadow-xl border border-white/60">
        {/* Dynamic Background Gradient */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isEnabled
              ? "bg-linear-to-br from-[#8E2DE2]/10 to-[#4A00E0]/10 opacity-100"
              : "bg-gray-50 opacity-100"
          }`}
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div
            className={`mb-6 p-4 rounded-full transition-all duration-500 ${
              isEnabled
                ? "bg-linear-to-br from-[#8E2DE2] to-[#4A00E0] shadow-lg shadow-purple-200 scale-110"
                : "bg-gray-100 text-gray-400 scale-100"
            }`}
          >
            {isEnabled ? (
              <Bell size={20} className="text-white animate-pulse" />
            ) : (
              <BellOff size={20} />
            )}
          </div>

          <div className="space-y-1 mb-2">
            <p
              className={`text-sm font-bold tracking-wider uppercase transition-colors duration-300 ${
                isEnabled ? "text-[#8E2DE2]" : "text-gray-400"
              }`}
            >
              {isEnabled ? "Alarm On" : "Alarm Off"}
            </p>
            <h2
              className={`text-5xl font-black tracking-tight transition-colors duration-300 ${
                isEnabled ? "text-gray-800" : "text-gray-300"
              }`}
            >
              {isEnabled
                ? `${alarmTime.ampm} ${alarmTime.hour}:${alarmTime.minute}`
                : "-- : --"}
            </h2>
          </div>

          <p className="text-sm text-gray-500 font-medium">
            {isEnabled
              ? "설정된 시간에 꿈 기록 알림을 보내드릴게요"
              : "알람을 설정하고 꿈 기록 습관을 만들어보세요"}
          </p>
        </div>
      </div>

      {/* Time Picker Section */}
      <div className="glass-panel rounded-3xl p-6 shadow-sm border border-white/40">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">시간 설정</h3>
          <div className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-500">
            매일 반복
          </div>
        </div>

        <div className="py-4">
          <TimePicker
            value={alarmTime}
            onChange={(newTime) => {
              setAlarmTime(newTime);
              if (!isEnabled) {
                handleToggle(true);
                toast.success("알람이 설정되었어요!", { icon: "⏰" });
              }
            }}
          />
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => {
          const newState = !isEnabled;
          handleToggle(newState);
          toast.success(
            newState ? "알람이 설정되었어요!" : "알람이 해제되었어요",
            { icon: newState ? "⏰" : "🔕" }
          );
        }}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] ${
          isEnabled
            ? "bg-white text-red-500 border border-red-100 hover:bg-red-50"
            : "bg-linear-to-r from-[#8E2DE2] to-[#4A00E0] text-white"
        }`}
      >
        {isEnabled ? "알람 끄기" : "알람 켜기"}
      </button>
    </div>
  );
};

export default AlarmPage;
