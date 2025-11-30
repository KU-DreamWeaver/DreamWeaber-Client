import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import ListPage from "./pages/ListPage";
import RecordPage from "./pages/RecordPage";
import AlarmPage from "./pages/AlarmPage";
import MyPage from "./pages/MyPage";

import Layout from "./components/layout/Layout";

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
