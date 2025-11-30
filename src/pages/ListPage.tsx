import React from "react";
import { Book } from "lucide-react";

const ListPage: React.FC = () => {
  return (
    <div className="p-4 pb-20">
      <h1
        className="gradient-title text-2xl font-bold mb-4"
        style={{ fontFamily: "'LOTTERIA CHAB', sans-serif" }}
      >
        DreamWeaver
      </h1>
      <div className="card-container rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Book size={20} className="text-[var(--primary)]" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            꿈 목록
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-4">
            <Book size={28} className="text-[var(--secondary)]" />
          </div>
          <p className="text-[var(--text-secondary)] text-sm">
            아직 기록된 꿈이 없어요
          </p>
          <p className="text-[var(--text-muted)] text-xs mt-1">
            기록 탭에서 꿈을 기록해보세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
