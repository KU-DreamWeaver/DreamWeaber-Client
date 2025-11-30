import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Book, Pen, Bell, User } from "lucide-react";

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
    <nav className="w-full bg-white/95 backdrop-blur-sm flex justify-around items-center h-[70px] px-4 border-t border-[var(--secondary-light)]/30 relative">
      {navItems.map((item) => {
        if (item.isFab) {
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full btn-primary shadow-lg flex flex-col items-center justify-center border-4 border-white"
              aria-label={item.label}
            >
              <item.icon size={20} color="white" strokeWidth={2} />
            </button>
          );
        }

        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
              active ? "text-[var(--primary)]" : "text-[var(--secondary)]/60"
            }`}
            aria-label={item.label}
          >
            <item.icon size={20} strokeWidth={active ? 2.5 : 2} />
            <span
              className={`text-[10px] ${
                active ? "font-semibold" : "font-medium"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
