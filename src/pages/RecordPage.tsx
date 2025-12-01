import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordModal from "../features/record/RecordModal";
import DreamDetailModal from "../components/dream/DreamDetailModal";
import type { DreamRecord } from "../types/dream";

const RecordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRecordOpen, setIsRecordOpen] = useState(true);
  const [resultData, setResultData] = useState<DreamRecord | null>(null);

  const handleRecordClose = () => {
    setIsRecordOpen(false);
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
    navigate("/calendar");
  };

  return (
    <div className="flex-1 relative overflow-hidden">
      <RecordModal
        isOpen={isRecordOpen}
        onClose={handleRecordClose}
        onSuccess={handleRecordSuccess}
      />
      <DreamDetailModal dream={resultData} onClose={handleResultClose} />
    </div>
  );
};

export default RecordPage;
