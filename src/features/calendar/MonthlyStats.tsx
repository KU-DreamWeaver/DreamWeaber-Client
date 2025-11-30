import React, { useMemo } from "react";
import { Smile, Frown, Angry, Ghost, Meh } from "lucide-react";
import type { DreamRecord, EmotionType } from "../../types/dream";

interface MonthlyStatsProps {
  currentMonthDreams: DreamRecord[];
}

const EMOTION_CONFIG: Record<
  EmotionType,
  {
    label: string;
    icon: React.ElementType;
    bgColor: string;
    textColor: string;
    gradient: string;
  }
> = {
  JOY: {
    label: "기쁨",
    icon: Smile,
    bgColor: "bg-[#FF9966]/10",
    textColor: "text-[#FF9966]",
    gradient: "from-[#FF9966] to-[#FF5E62]",
  },
  SAD: {
    label: "슬픔",
    icon: Frown,
    bgColor: "bg-[#5B86E5]/10",
    textColor: "text-[#5B86E5]",
    gradient: "from-[#5B86E5] to-[#36D1DC]",
  },
  ANGRY: {
    label: "분노",
    icon: Angry,
    bgColor: "bg-[#EF4444]/10",
    textColor: "text-[#EF4444]",
    gradient: "from-[#EF4444] to-[#F7797D]",
  },
  FEAR: {
    label: "공포",
    icon: Ghost,
    bgColor: "bg-[#8B5CF6]/10",
    textColor: "text-[#8B5CF6]",
    gradient: "from-[#8B5CF6] to-[#C471ED]",
  },
  MUMBLE: {
    label: "모호함",
    icon: Meh,
    bgColor: "bg-[#94A3B8]/10",
    textColor: "text-[#94A3B8]",
    gradient: "from-[#94A3B8] to-[#E2E2E2]",
  },
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
      <div className="text-center py-12 glass-panel rounded-4xl">
        <p className="text-gray-400 text-base">이번 달에 기록된 꿈이 없어요</p>
      </div>
    );
  }

  const MaxEmotionIcon = EMOTION_CONFIG[stats.maxEmotion].icon;
  const maxConfig = EMOTION_CONFIG[stats.maxEmotion];

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-[#1e293b] px-2">이번 달 분석</h3>

      {/* Main Emotion Card - Centered & Large */}
      <div className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-xl border border-white/60">
        <div
          className={`absolute inset-0 opacity-10 bg-linear-to-br ${maxConfig.gradient}`}
        />
        <div className="relative z-10 mb-4">
          <div
            className={`w-24 h-24 rounded-full bg-linear-to-br ${maxConfig.gradient} flex items-center justify-center shadow-lg shadow-gray-200`}
          >
            <MaxEmotionIcon
              size={48}
              className="text-white drop-shadow-md"
              strokeWidth={2.5}
            />
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
            가장 많이 느낀 감정
          </p>
          <p
            className={`text-4xl font-black bg-gradient-to-r ${maxConfig.gradient} bg-clip-text text-transparent`}
          >
            {maxConfig.label}
          </p>
        </div>
      </div>

      {/* Stats Grid - Individual Glass Pills */}
      <div className="grid gap-4">
        {Object.entries(stats.counts)
          .sort(([, a], [, b]) => b - a)
          .map(([key, count]) => {
            const emotion = key as EmotionType;
            const config = EMOTION_CONFIG[emotion];
            const percentage = Math.round((count / stats.total) * 100);

            return (
              <div
                key={emotion}
                className="glass-card p-4 flex items-center gap-4 hover:bg-white/60 transition-colors border border-white/40 shadow-md"
              >
                <div className={`p-3 rounded-2xl ${config.bgColor}`}>
                  <config.icon
                    size={24}
                    className={config.textColor}
                    strokeWidth={2.5}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-gray-700 text-lg">
                      {config.label}
                    </span>
                    <span className="font-bold text-gray-900 text-lg">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${config.gradient} shadow-sm`}
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
