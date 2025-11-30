import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import type { DreamRecord } from "../../types/dream";
import { getEmotionConfig } from "../../constants/dream";

interface DreamListCardProps {
  dream: DreamRecord;
  onClick: (dream: DreamRecord) => void;
}

const DreamListCard: React.FC<DreamListCardProps> = ({ dream, onClick }) => {
  const emotionConfig = getEmotionConfig(dream.emotion);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(dream)}
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
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${emotionConfig.bg} ${emotionConfig.textColor}`}
          >
            {emotionConfig.label}
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
  );
};

export default DreamListCard;
