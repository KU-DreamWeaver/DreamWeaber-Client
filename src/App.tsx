import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import BottomNav from "./components/layout/BottomNav";
import CalendarPage from "./pages/CalendarPage";
import ListPage from "./pages/ListPage";
import RecordPage from "./pages/RecordPage";
import AlarmPage from "./pages/AlarmPage";
import MyPage from "./pages/MyPage";
import "./App.css";

const Layout: React.FC = () => {
  return (
    <div className="h-full w-full bg-gray-100 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-[430px] h-full bg-white relative shadow-2xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-[80px] scrollbar-hide">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

import { useAlarmScheduler } from "./hooks/useAlarmScheduler";
import { Toaster } from "react-hot-toast";

function App() {
  useAlarmScheduler();

  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/calendar" replace />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
