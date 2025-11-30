import React from "react";
import { motion } from "framer-motion";
import { Calendar, Moon, Sparkles } from "lucide-react";
import type { DreamRecord } from "../../types/dream";
import { format } from "date-fns";

interface DreamCardProps {
  dream: DreamRecord;
  onClick?: () => void;
}

const DreamCard: React.FC<DreamCardProps> = ({ dream, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl cursor-pointer group"
    >
      {/* Full Bleed Image */}
      <img
        src={dream.imageUrl}
        alt="Dream visualization"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#2a0845]/90 via-[#6441A5]/40 to-transparent opacity-80" />

      {/* Content Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="glass-panel border-0 bg-white/10 backdrop-blur-md rounded-3xl p-5 text-white space-y-3 transform transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex gap-2 flex-wrap">
              {dream.keywords.slice(0, 2).map((keyword) => (
                <span
                  key={keyword}
                  className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm border border-white/10"
                >
                  #{keyword}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-white/80 text-xs bg-black/20 px-2 py-1 rounded-full">
              <Calendar size={12} />
              <span>{format(new Date(dream.createdAt), "yyyy-MM-dd")}</span>
            </div>
          </div>

          {/* Title/Description */}
          <div>
            <h3 className="text-lg font-bold leading-tight mb-1 line-clamp-2 drop-shadow-md">
              {dream.description}
            </h3>
            <p className="text-sm text-white/70 line-clamp-2">
              꿈의 해석이 이곳에 표시됩니다...
            </p>
          </div>

          {/* Footer */}
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-white/20">
                <Moon size={14} className="text-yellow-200" />
              </div>
              <span className="text-xs font-medium text-white/90">
                {dream.emotion === "JOY" ? "기분 좋은 꿈" : "심오한 꿈"}
              </span>
            </div>
            <Sparkles size={16} className="text-purple-200 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DreamCard;
