import React from "react";
import { Book, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ListPage: React.FC = () => {
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

      {/* Empty State */}
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
    </div>
  );
};

export default ListPage;
