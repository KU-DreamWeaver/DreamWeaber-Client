import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlarmStore } from "../store/useAlarmStore";
import { format } from "date-fns";
import toast from "react-hot-toast";
import AlarmToast from "../features/alarm/AlarmToast";

export const useAlarmScheduler = () => {
  const navigate = useNavigate();
  const { alarmTime, isEnabled, lastTriggeredDate, setLastTriggeredDate } =
    useAlarmStore();

  useEffect(() => {
    if (!isEnabled) return;

    const checkAlarm = () => {
      const now = new Date();
      const currentHour = format(now, "hh"); // 01-12
      const currentMinute = format(now, "mm"); // 00-59
      const currentAmpm = format(now, "a") === "AM" ? "오전" : "오후";
      const todayDate = format(now, "yyyy-MM-dd");

      // Check if alarm matches
      if (
        currentAmpm === alarmTime.ampm &&
        currentHour === alarmTime.hour &&
        currentMinute === alarmTime.minute
      ) {
        // Check if already triggered today
        if (lastTriggeredDate !== todayDate) {
          triggerAlarm(todayDate);
        }
      }
    };

    const triggerAlarm = (todayDate: string) => {
      // 1. Update last triggered date immediately to prevent double firing
      setLastTriggeredDate(todayDate);

      // 2. Try System Notification first
      if ("Notification" in window && Notification.permission === "granted") {
        try {
          const notification = new Notification("🌙 꿈을 기록할 시간이에요!", {
            body: "지금 바로 기록하고 해석을 받아보세요!",
            icon: "/icon-192x192.png",
          });

          notification.onclick = () => {
            window.focus();
            navigate("/record");
          };

          // If successful, we don't show the toast
          return;
        } catch (e) {
          console.error("Notification failed", e);
          // Fallback to toast if notification fails
        }
      } else {
        // 3. Fallback: In-App Custom Toast (if Notification not supported or failed)
        toast.custom((t) => <AlarmToast t={t} />, {
          duration: Infinity, // Require user interaction
          position: "top-center",
        });
      }
    };

    // Check every second for precision
    const intervalId = setInterval(checkAlarm, 1000);

    // Initial check
    checkAlarm();

    return () => clearInterval(intervalId);
  }, [isEnabled, alarmTime, lastTriggeredDate, setLastTriggeredDate, navigate]);
};
