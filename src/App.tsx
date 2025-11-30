import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import BottomNav from "./components/layout/BottomNav";
import CalendarPage from "./pages/CalendarPage";
import ListPage from "./pages/ListPage";
import RecordPage from "./pages/RecordPage";
import AlarmPage from "./pages/AlarmPage";
import MyPage from "./pages/MyPage";

import Header from "./components/layout/Header";

const Layout: React.FC = () => {
  return (
    // Desktop wrapper - fills entire viewport with gradient background
    <div className="desktop-wrapper h-dvh w-full flex justify-center items-center overflow-hidden">
      {/* Mobile container - centered on desktop, full screen on mobile */}
      <div className="mobile-gradient w-full max-w-[430px] h-full md:h-[90vh] md:max-h-[850px] md:rounded-4xl relative overflow-hidden md:shadow-2xl md:border md:border-white/20 flex flex-col">
        {/* Header */}
        <Header />

        {/* Content area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide relative w-full">
          <Outlet />
        </div>
        {/* Bottom Navigation */}
        <div className="shrink-0 z-50">
          <BottomNav />
        </div>
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
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#fcf1f8",
            color: "#1a1a2e",
            borderRadius: "12px",
            border: "1px solid #f064a1",
          },
        }}
      />
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
