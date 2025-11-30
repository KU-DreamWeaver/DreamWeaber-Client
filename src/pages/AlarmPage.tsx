import React from "react";
import TimePicker from "../features/alarm/TimePicker";
import { useAlarmStore } from "../store/useAlarmStore";
import toast from "react-hot-toast";
import { Bell, BellOff } from "lucide-react";

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
    <div className="p-4 space-y-4 pb-20">
      {/* Status Card */}
      <div
        className={`card-container relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 ${
          isEnabled ? "bg-(--primary-light)" : ""
        }`}
      >
        <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
          {isEnabled ? (
            <>
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm mb-2">
                <Bell size={28} className="text-white animate-pulse" />
              </div>
              <p className="text-sm font-medium opacity-90">
                알람이 설정되었어요
              </p>
              <h2 className="text-4xl font-bold tracking-tight">
                {alarmTime.ampm} {alarmTime.hour}:{alarmTime.minute}
              </h2>
              <p className="text-xs opacity-75">이 시간에 알림이 올려요</p>
            </>
          ) : (
            <>
              <div className="p-3 bg-(--primary-light) rounded-full mb-2">
                <BellOff size={28} className="text-(--secondary)" />
              </div>
              <p className="text-sm font-medium text-(--text-secondary)">
                알람이 꺼져있어요
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-(--text-muted)">
                -- : --
              </h2>
              <p className="text-xs text-(--text-muted)">
                아래에서 알람을 설정해보세요
              </p>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="card-container rounded-2xl p-6 space-y-5">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-(--text-primary) mb-1">
            시간 설정
          </h3>
          <p className="text-sm text-(--text-muted)">
            기상 시간을 선택해주세요
          </p>
        </div>

        <div className="py-2">
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

        {/* Action Button */}
        <button
          onClick={() => {
            if (!isEnabled) {
              handleToggle(true);
              toast.success("알람이 설정되었어요!", { icon: "⏰" });
            } else {
              handleToggle(false);
              toast.success("알람이 해제되었어요");
            }
          }}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${
            isEnabled
              ? "bg-(--primary) text-white"
              : "bg-white/50 text-gray-500"
          }`}
        >
          {isEnabled ? "알람 해제" : "알람 설정"}
        </button>
      </div>
    </div>
  );
};

export default AlarmPage;
