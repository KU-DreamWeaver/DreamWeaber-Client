import React, { useMemo } from "react";
import { Smile, Frown, Angry, Ghost, Meh } from "lucide-react";
import type { DreamRecord, EmotionType } from "../../types/dream";

interface MonthlyStatsProps {
  currentMonthDreams: DreamRecord[];
}

const EMOTION_CONFIG: Record<
  EmotionType,
  { label: string; icon: React.ElementType; color: string }
> = {
  JOY: { label: "Joy", icon: Smile, color: "text-pink-500 bg-pink-50" },
  SAD: { label: "Sad", icon: Frown, color: "text-blue-500 bg-blue-50" },
  ANGRY: { label: "Angry", icon: Angry, color: "text-red-500 bg-red-50" },
  FEAR: { label: "Fear", icon: Ghost, color: "text-purple-500 bg-purple-50" },
  MUMBLE: { label: "Mumble", icon: Meh, color: "text-gray-500 bg-gray-50" },
};

const MonthlyStats: React.FC<MonthlyStatsProps> = ({ currentMonthDreams }) => {
  const stats = useMemo(() => {
    if (currentMonthDreams.length === 0) return null;

    const counts = currentMonthDreams.reduce((acc, dream) => {
      acc[dream.emotion] = (acc[dream.emotion] || 0) + 1;
      return acc;
    }, {} as Record<EmotionType, number>);

    const maxEmotion = Object.entries(counts).reduce((a, b) =>
      counts[a[0] as EmotionType] > counts[b[0] as EmotionType] ? a : b
    )[0] as EmotionType;

    return {
      counts,
      maxEmotion,
      total: currentMonthDreams.length,
    };
  }, [currentMonthDreams]);

  if (!stats) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border text-center text-gray-400">
        <p>No dreams recorded this month.</p>
      </div>
    );
  }

  const MaxEmotionIcon = EMOTION_CONFIG[stats.maxEmotion].icon;

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Monthly Analysis
      </h3>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Emotion of the Month</p>
          <p className="text-2xl font-bold text-gray-900">
            {EMOTION_CONFIG[stats.maxEmotion].label}
          </p>
        </div>
        <div
          className={`p-4 rounded-full ${
            EMOTION_CONFIG[stats.maxEmotion].color
          }`}
        >
          <MaxEmotionIcon size={32} />
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(stats.counts)
          .sort(([, a], [, b]) => b - a)
          .map(([key, count]) => {
            const emotion = key as EmotionType;
            const config = EMOTION_CONFIG[emotion];
            const percentage = Math.round((count / stats.total) * 100);

            return (
              <div key={emotion} className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${config.color}`}>
                  <config.icon size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      {config.label}
                    </span>
                    <span className="text-gray-500">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${config.color
                        .split(" ")[0]
                        .replace("text", "bg")}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MonthlyStats;
