import React from "react";
import { X, Sparkles } from "lucide-react";
import type { DreamRecord } from "../../types/dream";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DreamRecord | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-[430px] z-[100] flex items-center justify-center mobile-gradient px-4 py-6">
      <div className="w-full max-w-[400px] card-container rounded-2xl overflow-hidden flex flex-col max-h-full relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--secondary-light)]/30">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[var(--primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">
              꿈 해석 결과
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--primary-light)] rounded-full transition-colors"
          >
            <X size={20} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 overflow-y-auto min-h-0">
          {/* Image Area */}
          <div className="relative w-full aspect-square bg-[var(--secondary-light)]/30">
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                crossOrigin="anonymous"
                alt="Dream Interpretation"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-muted)] gap-3">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                  <Sparkles size={28} className="text-[var(--secondary)]" />
                </div>
                <span className="text-sm">이미지 생성 중...</span>
              </div>
            )}

            {/* Text Overlay (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
              <p className="text-sm font-medium leading-relaxed line-clamp-3">
                {data.description}
              </p>
            </div>
          </div>

          {/* Keywords */}
          {data.keywords && data.keywords.length > 0 && (
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[var(--primary-light)] rounded-full text-xs text-[var(--secondary)] font-medium"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--secondary-light)]/30">
          <button
            onClick={onClose}
            className="btn-primary w-full py-3 text-white rounded-xl font-semibold"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
