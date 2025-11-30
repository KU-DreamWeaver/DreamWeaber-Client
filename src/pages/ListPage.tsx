import React, { useState } from "react";
import { Book, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useDreamsQuery } from "../hooks/queries/useDream";
import DreamCard from "../components/dream/DreamCard";
import DreamDetailModal from "../components/dream/DreamDetailModal";
import type { DreamRecord } from "../types/dream";
import { format } from "date-fns";

const ListPage: React.FC = () => {
  const [selectedDream, setSelectedDream] = useState<DreamRecord | null>(null);
  // Fetch dreams for current month (or all if API supported it, but using dummy data so it returns all)
  const { data: response } = useDreamsQuery(format(new Date(), "yyyy-MM"));
  const dreams = response?.data || [];

  return (
    <div className="p-6 space-y-6 pb-24 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-md shadow-sm">
          <Book size={24} className="text-[#8E2DE2]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1e293b] tracking-tight">
          꿈 보관함
        </h2>
      </div>

      {dreams.length > 0 ? (
        <div className="space-y-4">
          {dreams.map((dream) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedDream(dream)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <img
                  src={
                    dream.imageUrl ||
                    "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?q=80&w=2071&auto=format&fit=crop"
                  }
                  alt="Dream"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-500">
                    {format(new Date(dream.createdAt), "yyyy. MM. dd")}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      dream.emotion === "JOY"
                        ? "bg-yellow-100 text-yellow-700"
                        : dream.emotion === "SAD"
                        ? "bg-blue-100 text-blue-700"
                        : dream.emotion === "ANGRY"
                        ? "bg-red-100 text-red-700"
                        : dream.emotion === "FEAR"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {dream.emotion}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1 truncate">
                  {dream.description}
                </h3>
                <div className="flex gap-1 overflow-hidden">
                  {dream.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md whitespace-nowrap"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[32px] p-12 flex flex-col items-center justify-center text-center min-h-[400px] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#e0c3fc] to-[#8ec5fc] flex items-center justify-center mb-6 shadow-lg shadow-purple-200/50 animate-pulse">
            <Sparkles size={40} className="text-white drop-shadow-md" />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2 relative z-10">
            아직 기록된 꿈이 없어요
          </h3>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-[200px] relative z-10">
            오늘 밤 꾼 꿈을 기록하고
            <br />
            나만의 꿈 지도를 만들어보세요
          </p>

          <button className="px-6 py-3 rounded-full bg-white border border-purple-100 text-[#8E2DE2] font-bold text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 relative z-10">
            첫 번째 꿈 기록하기
          </button>
        </motion.div>
      )}

      {/* Detail Modal */}
      <DreamDetailModal
        dream={selectedDream}
        onClose={() => setSelectedDream(null)}
      />
    </div>
  );
};

export default ListPage;
