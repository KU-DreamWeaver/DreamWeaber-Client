import React from "react";

import { CloudMoon } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-4 px-6 flex justify-center items-center shrink-0 z-10 sticky top-0">
      <div className="glass-button rounded-full px-4 py-2 flex items-center gap-2">
        <CloudMoon size={24} className="text-(--primary)" />
        <span
          className="text-2xl font-light"
          style={{ fontFamily: "'LOTTERIA CHAB', sans-serif" }}
        >
          DreamWeaver
        </span>
      </div>
    </header>
  );
};

export default Header;
