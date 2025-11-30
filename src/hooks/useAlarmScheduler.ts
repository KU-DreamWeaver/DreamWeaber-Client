import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlarmStore } from '../store/useAlarmStore';
import { format } from 'date-fns';

export const useAlarmScheduler = () => {
  const navigate = useNavigate();
  const { alarmTime, isEnabled, lastTriggeredDate, setLastTriggeredDate } = useAlarmStore();

  useEffect(() => {
    if (!isEnabled) return;

    const checkAlarm = () => {
      const now = new Date();
      const currentHour = format(now, 'hh'); // 01-12
      const currentMinute = format(now, 'mm'); // 00-59
      const currentAmpm = format(now, 'a') === 'AM' ? '오전' : '오후';
      const todayDate = format(now, 'yyyy-MM-dd');

      // Check if alarm matches
      console.log(`[Alarm Check] Current: ${currentAmpm} ${currentHour}:${currentMinute} | Target: ${alarmTime.ampm} ${alarmTime.hour}:${alarmTime.minute} | Last: ${lastTriggeredDate}`);
      
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
      // 1. Send Notification
      if (Notification.permission === 'granted') {
        new Notification('🌙 꿈을 기록할 시간이에요!', {
          body: '지금 바로 기록하고 해석을 받아보세요!',
        });
      }

      // 2. Update last triggered date immediately to prevent double firing
      setLastTriggeredDate(todayDate);

      // 3. Ask user
      // Using setTimeout to ensure UI isn't blocked immediately if notification fires
      setTimeout(() => {
        const shouldRecord = window.confirm('🌙 꿈을 기록할 시간이에요!\n지금 꿈을 기록하시겠습니까?');
        if (shouldRecord) {
          navigate('/record');
        }
      }, 100);
    };

    // Check every 10 seconds
    const intervalId = setInterval(checkAlarm, 10000);

    // Initial check
    checkAlarm();

    return () => clearInterval(intervalId);
  }, [isEnabled, alarmTime, lastTriggeredDate, setLastTriggeredDate, navigate]);
};
