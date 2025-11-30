import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Book, Pen, Bell, User } from "lucide-react";

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Calendar, path: "/calendar", label: "Calendar" },
    { icon: Book, path: "/list", label: "List" },
    { icon: Pen, path: "/record", label: "Record", isFab: true },
    { icon: Bell, path: "/alarm", label: "Alarm" },
    { icon: User, path: "/my", label: "My" },
  ];

  return (
    <nav className="fixed bottom-0 max-w-[430px] w-full h-[80px] bg-white border-t rounded-t-[24px] z-50 flex justify-around items-center px-4">
      {navItems.map((item) => {
        if (item.isFab) {
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary shadow-lg flex items-center justify-center border-4 border-white"
              aria-label={item.label}
            >
              <item.icon size={28} color="white" />
            </button>
          );
        }

        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-12 h-12 ${
              active ? "text-primary" : "text-gray-300"
            }`}
            aria-label={item.label}
          >
            <item.icon size={24} />
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
