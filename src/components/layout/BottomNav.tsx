import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Book, Pen, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Calendar, path: "/calendar", label: "캘린더" },
    { icon: Book, path: "/list", label: "목록" },
    { icon: Pen, path: "/record", label: "기록", isFab: true },
    { icon: Bell, path: "/alarm", label: "알람" },
    { icon: User, path: "/my", label: "마이" },
  ];

  return (
    <nav className="w-full h-[88px] glass-panel flex justify-evenly items-center px-6 relative z-50 pb-4">
      {navItems.map((item) => {
        if (item.isFab) {
          return (
            <div key={item.path} className="relative -top-8 group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.path)}
                className="w-[72px] h-[72px] rounded-full from-[#4A00E0] via-[#8E2DE2] to-[#5B86E5] flex items-center justify-center text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.5)] animate-breathe relative z-10"
                aria-label={item.label}
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-(--primary-start) to-(--primary-end)" />
                <item.icon
                  size={32}
                  strokeWidth={2.5}
                  className="relative z-10"
                />
              </motion.button>
            </div>
          );
        }

        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 w-14 ${
              active ? "text-[#8E2DE2]" : "text-[#94a3b8] hover:text-[#64748b]"
            }`}
            aria-label={item.label}
          >
            <div
              className={`p-2 rounded-2xl transition-all duration-300 ${
                active ? "bg-white/50 shadow-sm backdrop-blur-sm" : ""
              }`}
            >
              <item.icon
                size={26}
                strokeWidth={active ? 2.5 : 2}
                className={`transition-all duration-300 ${
                  active ? "drop-shadow-sm" : ""
                }`}
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
