import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Moon, Sparkles } from "lucide-react";
import type { DreamRecord } from "../../types/dream";

interface DreamDetailModalProps {
  dream: DreamRecord | null;
  onClose: () => void;
}

const DreamDetailModal: React.FC<DreamDetailModalProps> = ({
  dream,
  onClose,
}) => {
  if (!dream) return null;

  return (
    <AnimatePresence>
      {dream && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed h-full inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="w-full max-w-[380px] rounded-3xl shadow-2xl max-h-[85vh] pointer-events-auto relative overflow-y-auto custom-scrollbar bg-transparent"
            >
              {/* Image Section (Sticky) */}
              <div className="h-80 w-full sticky top-0 z-0">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors backdrop-blur-sm"
                >
                  <X size={20} />
                </button>
                <img
                  src={
                    dream.imageUrl ||
                    "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?q=80&w=2071&auto=format&fit=crop"
                  }
                  alt="Dream"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-14 left-6 right-6 text-white">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {dream.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm border border-white/10"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold leading-tight drop-shadow-lg line-clamp-2">
                    {dream.description}
                  </h2>
                </div>
              </div>

              {/* Content Section (Overlapping) */}
              <div className="relative z-10 bg-white rounded-t-3xl -mt-10 p-7 pb-30 space-y-6 min-h-[70vh]">
                {/* Date & Emotion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">
                      {new Date(dream.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                    <Moon size={14} />
                    <span className="text-sm font-bold">{dream.emotion}</span>
                  </div>
                </div>

                {/* Full Description */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    꿈 내용
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                    {dream.description}
                  </p>
                </div>

                {/* AI Analysis */}
                {dream.aiSummary && (
                  <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2 text-purple-700">
                      <Sparkles size={18} />
                      <h3 className="font-bold text-sm">AI 해몽</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {dream.aiSummary}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DreamDetailModal;
