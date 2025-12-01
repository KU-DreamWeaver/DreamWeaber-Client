import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlarmStore } from "../store/useAlarmStore";
import { format } from "date-fns";
import toast from "react-hot-toast";
import AlarmToast from "../features/alarm/AlarmToast";
import { playAlarmSound } from "../utils/audio";

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
      const ampmRaw = format(now, "a");
      const currentAmpm = ampmRaw.toUpperCase() === "AM" ? "오전" : "오후";
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

      // Play sound
      playAlarmSound();

      // 2. Always show In-App Custom Toast
      toast.custom((t) => <AlarmToast t={t} />, {
        duration: Infinity, // Require user interaction
        position: "top-center",
      });
    };

    // Check every second for precision
    const intervalId = setInterval(checkAlarm, 1000);

    // Initial check
    checkAlarm();

    return () => clearInterval(intervalId);
  }, [isEnabled, alarmTime, lastTriggeredDate, setLastTriggeredDate, navigate]);
};
