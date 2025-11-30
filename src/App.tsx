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
    <div className="min-h-screen bg-gray-50 pb-[80px]">
      <div className="max-w-[430px] mx-auto bg-white min-h-screen relative shadow-xl">
        <Outlet />
        <BottomNav />
      </div>
    </div>
  );
};

function App() {
  return (
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
  );
}

export default App;
