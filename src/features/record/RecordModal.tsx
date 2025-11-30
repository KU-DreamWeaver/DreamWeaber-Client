import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Smile, Frown, Angry, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  color: string;
}[] = [
  { value: "JOY", label: "기쁨", icon: Smile, color: "text-[#FF9966]" },
  { value: "SAD", label: "슬픔", icon: Frown, color: "text-[#5B86E5]" },
  { value: "ANGRY", label: "분노", icon: Angry, color: "text-[#EF4444]" },
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#faf9fe]/90 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="pt-6 px-6 shrink-0 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#1e293b]">
              꿈 기록하기
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="glass-card p-6 space-y-8">
              {/* Emotion Section */}
              <section>
                <label className="block text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                  오늘의 기분
                </label>
                <div className="flex gap-4">
                  {EMOTIONS.map((emotion) => (
                    <label
                      key={emotion.value}
                      className="cursor-pointer group flex-1"
                    >
                      <input
                        type="radio"
                        value={emotion.value}
                        {...register("emotion")}
                        className="peer hidden"
                      />
                      <div
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 border-2 ${
                          selectedEmotion === emotion.value
                            ? "bg-white border-[#8E2DE2] shadow-lg scale-105"
                            : "bg-white/40 border-transparent hover:bg-white/60"
                        }`}
                      >
                        <emotion.icon
                          size={32}
                          className={`transition-colors duration-300 ${
                            selectedEmotion === emotion.value
                              ? emotion.color
                              : "text-gray-400"
                          }`}
                          strokeWidth={2}
                        />
                        <span
                          className={`text-xs font-medium ${
                            selectedEmotion === emotion.value
                              ? "text-gray-800"
                              : "text-gray-400"
                          }`}
                        >
                          {emotion.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Keyword Section */}
              <section>
                <label className="block text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                  키워드
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="꿈의 키워드를 입력하세요"
                    className="flex-1 h-12 px-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-[#8E2DE2] outline-none transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="w-12 h-12 rounded-xl bg-[#8E2DE2] text-white flex items-center justify-center shadow-lg shadow-purple-200 hover:bg-[#7a25c2] transition-colors"
                  >
                    <Plus size={24} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[2rem]">
                  <AnimatePresence>
                    {keywords.map((keyword) => (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        key={keyword}
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="px-3 py-1.5 bg-white border border-purple-100 rounded-lg text-sm cursor-pointer hover:bg-purple-50 flex items-center gap-1 text-[#8E2DE2] font-medium shadow-sm transition-colors"
                      >
                        {keyword}
                        <X size={14} strokeWidth={2.5} />
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </section>

              {/* Description Section */}
              <section>
                <label className="block text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                  꿈 내용
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full h-32 p-4 rounded-2xl border border-gray-200 bg-white/50 focus:bg-white focus:border-[#8E2DE2] outline-none transition-all resize-none placeholder:text-gray-400 leading-relaxed"
                  placeholder="어떤 꿈을 꾸셨나요? 자세히 적어주세요."
                />
                {errors.description && (
                  <span className="text-pink-500 text-xs mt-2 block font-medium pl-1">
                    꿈 내용을 입력해주세요
                  </span>
                )}
              </section>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 bg-white/50 backdrop-blur-md border-t border-white/20">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="w-full h-14 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 hover:shadow-purple-300 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                "해석 중..."
              ) : (
                <>
                  <span>꿈 기록하기</span>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecordModal;
