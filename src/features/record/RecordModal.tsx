import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Plus, Smile, Frown, Angry, Ghost, Meh } from "lucide-react";
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
  { value: "JOY", label: "Joy", icon: Smile },
  { value: "SAD", label: "Sad", icon: Frown },
  { value: "ANGRY", label: "Angry", icon: Angry },
  { value: "FEAR", label: "Fear", icon: Ghost },
  { value: "MUMBLE", label: "Mumble", icon: Meh },
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
      emotion: "MUMBLE",
    },
  });

  const { mutate, isPending } = useCreateDreamMutation();

  const keywords = watch("keywords");

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-[430px] bg-white rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Keyword Section */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="키워드를 입력하세요"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="button"
                onClick={handleAddKeyword}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200 flex items-center gap-1"
                >
                  {keyword}
                  <X size={14} className="text-gray-500" />
                </span>
              ))}
            </div>
          </section>

          {/* Description Section */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full h-32 px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="짧은 문장을 입력하세요"
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                Description is required
              </span>
            )}
          </section>

          {/* Emotion Section */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emotion
            </label>
            <div className="grid grid-cols-3 gap-4">
              {EMOTIONS.map((emotion) => (
                <label key={emotion.value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={emotion.value}
                    {...register("emotion")}
                    className="peer hidden"
                  />
                  <div className="flex flex-col items-center justify-center p-3 border rounded-xl hover:bg-gray-50 peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-primary/10 transition-all">
                    <emotion.icon
                      size={24}
                      className="mb-1 text-gray-600 peer-checked:text-primary"
                    />
                    <span className="text-xs text-gray-600 peer-checked:text-primary font-medium">
                      {emotion.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "해석 중..." : "제출"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordModal;
