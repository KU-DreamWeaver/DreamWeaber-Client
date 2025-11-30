import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AlarmTime {
  ampm: string;
  hour: string;
  minute: string;
}

interface AlarmState {
  alarmTime: AlarmTime;
  isEnabled: boolean;
  lastTriggeredDate: string | null;
  setAlarmTime: (time: AlarmTime) => void;
  setIsEnabled: (enabled: boolean) => void;
  setLastTriggeredDate: (date: string) => void;
}

export const useAlarmStore = create<AlarmState>()(
  persist(
    (set) => ({
      alarmTime: { ampm: '오전', hour: '07', minute: '00' },
      isEnabled: false,
      lastTriggeredDate: null,
      setAlarmTime: (time) => set({ alarmTime: time, lastTriggeredDate: null }),
      setIsEnabled: (enabled) => set({ isEnabled: enabled }),
      setLastTriggeredDate: (date) => set({ lastTriggeredDate: date }),
    }),
    {
      name: 'alarm-storage',
    }
  )
);
