import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

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

export default Layout;
