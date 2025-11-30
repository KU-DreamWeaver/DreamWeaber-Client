import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Smile, Frown, Angry, X } from "lucide-react";
import { useCreateDreamMutation } from "../../hooks/queries/useDream";
import type { EmotionType, DreamRecord } from "../../types/dream";

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: DreamRecord) => void;
}

interface RecordFormValues {
  keywords: string[];
  description: string;
  emotion: EmotionType;
}

const EMOTIONS: {
  value: EmotionType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "JOY", label: "기쁨", icon: Smile },
  { value: "SAD", label: "슬픔", icon: Frown },
  { value: "ANGRY", label: "분노", icon: Angry },
];

const RecordModal: React.FC<RecordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [keywordInput, setKeywordInput] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RecordFormValues>({
    defaultValues: {
      keywords: [],
      description: "",
      emotion: "JOY",
    },
  });

  const { mutate, isPending } = useCreateDreamMutation();

  const keywords = watch("keywords");
  const selectedEmotion = watch("emotion");

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setValue("keywords", [...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setValue(
      "keywords",
      keywords.filter((k) => k !== keywordToRemove)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const onSubmit = (data: RecordFormValues) => {
    mutate(data, {
      onSuccess: (response) => {
        reset();
        onSuccess(response.data);
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] flex flex-col mobile-gradient overflow-hidden">
      {/* Header with Title */}
      <div className="pt-6 px-5 shrink-0">
        <h1
          className="gradient-title text-2xl font-bold tracking-tight"
          style={{ fontFamily: "'LOTTERIA CHAB', sans-serif" }}
        >
          DreamWeaver
        </h1>
      </div>

      {/* Main Character Image - using local asset */}
      <div className="flex justify-center items-center shrink-0 py-3">
        <div className="w-[100px] h-[100px] shrink-0">
          <img
            src="/charactor.png"
            alt="Dream character"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Card Container - scrollable */}
      <div className="flex-1 mx-4 mb-3 rounded-2xl p-4 flex flex-col card-container overflow-y-auto min-h-0">
        {/* Keyword Section */}
        <section className="mb-4 shrink-0">
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
            키워드를 입력하세요
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="키워드"
              className="input-field flex-1 h-10 px-4 rounded-full text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="btn-primary w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md"
            >
              <Plus size={20} strokeWidth={2.5} />
            </button>
          </div>
          {/* Keywords Tags */}
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="px-2.5 py-1 bg-[var(--primary-light)] rounded-full text-xs cursor-pointer hover:bg-[var(--secondary-light)] flex items-center gap-1 text-[var(--secondary)] font-medium transition-colors"
                >
                  {keyword}
                  <X size={12} />
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Description Section */}
        <section className="mb-4 shrink-0">
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
            짧은 문장을 입력하세요
          </label>
          <input
            {...register("description", { required: true })}
            type="text"
            className="input-field w-full h-10 px-4 rounded-full text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
            placeholder="오늘 꾼 꿈에 대해 적어주세요"
          />
          {errors.description && (
            <span className="text-[var(--primary)] text-xs mt-1 block">
              문장을 입력해주세요
            </span>
          )}
        </section>

        {/* Emotion Section */}
        <section className="mb-4 shrink-0">
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
            감정을 선택하세요
          </label>
          <div className="flex gap-2 justify-start">
            {EMOTIONS.map((emotion) => (
              <label key={emotion.value} className="cursor-pointer">
                <input
                  type="radio"
                  value={emotion.value}
                  {...register("emotion")}
                  className="peer hidden"
                />
                <div
                  className={`emotion-btn w-[60px] h-[60px] rounded-xl flex flex-col items-center justify-center gap-0.5 ${
                    selectedEmotion === emotion.value ? "selected" : ""
                  }`}
                >
                  <emotion.icon
                    size={26}
                    className={
                      selectedEmotion === emotion.value
                        ? "text-[var(--primary)]"
                        : "text-[var(--secondary)]"
                    }
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-[10px] font-medium ${
                      selectedEmotion === emotion.value
                        ? "text-[var(--primary)]"
                        : "text-[var(--secondary)]"
                    }`}
                  >
                    {emotion.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Submit Button - at bottom */}
        <div className="mt-auto pt-3 shrink-0">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="btn-primary w-full h-11 text-white rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isPending ? "해석 중..." : "제출"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordModal;
