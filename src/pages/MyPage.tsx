import React from "react";
import { User, Settings, Moon, LogOut } from "lucide-react";

const MyPage: React.FC = () => {
  const menuItems = [
    {
      icon: User,
      label: "프로필 설정",
      description: "닉네임, 프로필 사진 변경",
    },
    { icon: Moon, label: "꿈 통계", description: "나의 꿈 패턴 분석" },
    { icon: Settings, label: "설정", description: "알림, 언어 설정" },
    { icon: LogOut, label: "로그아웃", description: "계정에서 로그아웃" },
  ];

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Profile Card */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group bg-white/40">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-[3px] shadow-lg shadow-pink-200">
            <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
              <User size={32} className="text-[var(--primary)]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
              드림웨버
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-medium">
              dreamer@example.com
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="glass-panel rounded-3xl overflow-hidden p-2 bg-white/40">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-200 text-left group ${
              index !== menuItems.length - 1 ? "border-b border-white/40" : ""
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 border border-white/50">
              <item.icon size={22} className="text-[var(--primary)]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[var(--text-primary)] text-[15px]">
                {item.label}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {item.description}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 bg-white/50">
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9L5 5L1 1"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
