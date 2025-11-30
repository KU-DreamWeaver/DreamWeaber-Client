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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] z-50 mx-auto md:w-full md:max-w-[400px] md:left-1/2 md:right-auto md:-translate-x-1/2"
          >
            <div className="bg-white rounded-4xl overflow-hidden h-full flex flex-col shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image Section */}
              <div className="h-[40%] relative">
                <img
                  src={
                    dream.imageUrl ||
                    "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?q=80&w=2071&auto=format&fit=crop"
                  }
                  alt="Dream"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex gap-2 mb-2">
                    {dream.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm border border-white/10"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold leading-tight drop-shadow-lg">
                    {dream.description.length > 30
                      ? dream.description.slice(0, 30) + "..."
                      : dream.description}
                  </h2>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                {/* Date & Emotion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">
                      {new Date(dream.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600">
                    <Moon size={16} />
                    <span className="text-sm font-bold">{dream.emotion}</span>
                  </div>
                </div>

                {/* Full Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">꿈 내용</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dream.description}
                  </p>
                </div>

                {/* AI Analysis */}
                {dream.aiSummary && (
                  <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100">
                    <div className="flex items-center gap-2 mb-3 text-purple-700">
                      <Sparkles size={20} />
                      <h3 className="font-bold">AI 해몽</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {dream.aiSummary}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DreamDetailModal;
