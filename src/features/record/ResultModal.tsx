import React from "react";
import { X } from "lucide-react";
import type { DreamRecord } from "../../types/dream";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DreamRecord | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-[430px] bg-white rounded-2xl overflow-hidden flex flex-col max-h-[90vh] relative">
        {/* Close Button (Overlay or Header) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/30 rounded-full text-white backdrop-blur-sm transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Image Area */}
          <div className="relative w-full aspect-square bg-gray-100">
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                crossOrigin="anonymous"
                alt="Dream Interpretation"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image Generated
              </div>
            )}

            {/* Text Overlay (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              <p className="text-sm md:text-base font-medium leading-relaxed line-clamp-3">
                {data.description}
              </p>
            </div>
          </div>

          {/* Optional: Full Text / Details below if needed, but prompt asked for overlay or bottom */}
          {/* <div className="p-6">
             <h3 className="font-bold text-lg mb-2">Dream Analysis</h3>
             <p className="text-gray-700">{data.aiSummary || data.description}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
