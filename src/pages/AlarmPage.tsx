import React, { useState } from "react";
import TimePicker from "../features/alarm/TimePicker";
import { useAlarmStore } from "../store/useAlarmStore";
import toast from "react-hot-toast";
import { Bell, BellOff, Clock, PenLine, Check, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import AlarmToast from "../features/alarm/AlarmToast";
import { playAlarmSound } from "../utils/audio";

const AlarmPage: React.FC = () => {
  const { alarmTime, isEnabled, setAlarmTime, setIsEnabled } = useAlarmStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTime, setTempTime] = useState(alarmTime);

  const handleTestAlarm = () => {
    playAlarmSound();
    toast.custom(
      (t) => (
        <AlarmToast
          t={t}
          isTest={true}
          title="[테스트] 기상 시간입니다!"
          message="알람이 정상적으로 작동합니다."
        />
      ),
      {
        duration: 5000,
        position: "top-center",
      }
    );
  };

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
  };

  const handleSaveEdit = () => {
    setAlarmTime(tempTime);
    setIsEditing(false);
    toast.success("알람 시간이 변경되었어요", { icon: "⏰" });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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

            <div className="flex items-center justify-center gap-3">
              <h2
                className={`text-3xl font-black tracking-tight transition-colors duration-300 ${
                  isEnabled ? "text-gray-800" : "text-gray-300"
                }`}
              >
                {isEnabled
                  ? `${alarmTime.ampm} ${alarmTime.hour}:${alarmTime.minute}`
                  : "-- : --"}
              </h2>

              {isEnabled && !isEditing && (
                <button
                  onClick={() => {
                    setTempTime(alarmTime);
                    setIsEditing(true);
                  }}
                  className="p-2 rounded-full bg-white/50 hover:bg-white text-gray-400 hover:text-[#8E2DE2] transition-all shadow-sm hover:shadow-md"
                  aria-label="Edit alarm time"
                >
                  <PenLine size={20} />
                </button>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-500 font-medium mt-2">
            {isEnabled
              ? "설정된 시간에 꿈 기록 알림을 보내드릴게요"
              : "알람을 설정하고 꿈 기록 습관을 만들어보세요"}
          </p>
        </div>
      </div>

      {/* Time Picker Section - Collapsible */}
      <AnimatePresence>
        {(!isEnabled || isEditing) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-panel rounded-3xl p-6 shadow-sm border border-white/40">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  {isEnabled ? "시간 변경" : "시간 설정"}
                </h3>

                {isEnabled ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-500 text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-1"
                    >
                      <X size={14} /> 취소
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1.5 rounded-xl bg-[#8E2DE2] text-white text-sm font-bold hover:bg-[#7a25c2] transition-colors flex items-center gap-1 shadow-md shadow-purple-200"
                    >
                      <Check size={14} /> 저장
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                    매일 반복
                  </div>
                )}
              </div>

              <div className="py-4">
                <TimePicker
                  value={isEnabled ? tempTime : alarmTime}
                  onChange={(newTime) => {
                    if (isEnabled) {
                      setTempTime(newTime);
                    } else {
                      setAlarmTime(newTime);
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isEditing && (
        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              handleToggle(!isEnabled);
              toast.success(
                !isEnabled ? "알람이 설정되었어요!" : "알람이 해제되었어요",
                { icon: !isEnabled ? "⏰" : "🔕" }
              );
            }}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-md hover:shadow-lg active:scale-[0.98] ${
              isEnabled
                ? "bg-white text-red-500 border border-red-100 hover:bg-red-50"
                : "bg-linear-to-r from-[#8E2DE2] to-[#4A00E0] text-white"
            }`}
          >
            {isEnabled ? "알람 끄기" : "알람 켜기"}
          </motion.button>

          <button
            onClick={handleTestAlarm}
            className="w-full py-3 text-sm text-gray-400 hover:text-[#8E2DE2] font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Play size={14} />
            알람 테스트하기
          </button>
        </div>
      )}
    </div>
  );
};

export default AlarmPage;
