import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordModal from "../features/record/RecordModal";
import ResultModal from "../features/record/ResultModal";
import type { DreamRecord } from "../types/dream";

const RecordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRecordOpen, setIsRecordOpen] = useState(true);
  const [resultData, setResultData] = useState<DreamRecord | null>(null);

  const handleRecordClose = () => {
    setIsRecordOpen(false);
    // If no result, go back (or stay if you want).
    // Usually if user cancels, we might want to go back to previous page or home.
    if (!resultData) {
      navigate(-1);
    }
  };

  const handleRecordSuccess = (data: DreamRecord) => {
    setResultData(data);
    setIsRecordOpen(false);
  };

  const handleResultClose = () => {
    setResultData(null);
    navigate("/calendar"); // Go to calendar after viewing result
  };

  return (
    <div className="p-4 flex items-center justify-center h-full">
      <p className="text-gray-500">Opening Record Modal...</p>
      <RecordModal
        isOpen={isRecordOpen}
        onClose={handleRecordClose}
        onSuccess={handleRecordSuccess}
      />
      <ResultModal
        isOpen={!!resultData}
        onClose={handleResultClose}
        data={resultData}
      />
    </div>
  );
};

export default RecordPage;
