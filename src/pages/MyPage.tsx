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
    <div className="p-4 pb-20">
      <h1
        className="gradient-title text-2xl font-bold mb-4"
        style={{ fontFamily: "'LOTTERIA CHAB', sans-serif" }}
      >
        DreamWeaver
      </h1>

      {/* Profile Card */}
      <div className="card-container rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
            <User size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              드림웨버
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              dreamer@example.com
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="card-container rounded-2xl overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 p-4 hover:bg-[var(--primary-light)] transition-colors text-left ${
              index !== menuItems.length - 1
                ? "border-b border-[var(--secondary-light)]/30"
                : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
              <item.icon size={18} className="text-[var(--primary)]" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-[var(--text-primary)]">
                {item.label}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
