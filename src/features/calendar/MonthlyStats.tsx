import React, { useMemo } from "react";
import { Smile, Frown, Angry, Ghost, Meh } from "lucide-react";
import type { DreamRecord, EmotionType } from "../../types/dream";

interface MonthlyStatsProps {
  currentMonthDreams: DreamRecord[];
}

const EMOTION_CONFIG: Record<
  EmotionType,
  { label: string; icon: React.ElementType; bgColor: string; textColor: string }
> = {
  JOY: {
    label: "기쁨",
    icon: Smile,
    bgColor: "bg-[var(--primary-light)]",
    textColor: "text-[var(--primary)]",
  },
  SAD: {
    label: "슬픔",
    icon: Frown,
    bgColor: "bg-[var(--secondary-light)]/50",
    textColor: "text-[var(--secondary)]",
  },
  ANGRY: {
    label: "분노",
    icon: Angry,
    bgColor: "bg-red-100",
    textColor: "text-red-500",
  },
  FEAR: {
    label: "공포",
    icon: Ghost,
    bgColor: "bg-purple-100",
    textColor: "text-purple-500",
  },
  MUMBLE: {
    label: "모호함",
    icon: Meh,
    bgColor: "bg-gray-100",
    textColor: "text-gray-500",
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
      <div className="text-center py-6">
        <p className="text-[var(--text-muted)] text-sm">
          이번 달에 기록된 꿈이 없어요
        </p>
      </div>
    );
  }

  const MaxEmotionIcon = EMOTION_CONFIG[stats.maxEmotion].icon;
  const maxConfig = EMOTION_CONFIG[stats.maxEmotion];

  return (
    <div>
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">
        이번 달 분석
      </h3>

      <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-[var(--primary-light)]">
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-0.5">
            이번 달의 감정
          </p>
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {maxConfig.label}
          </p>
        </div>
        <div className={`p-3 rounded-full ${maxConfig.bgColor}`}>
          <MaxEmotionIcon size={24} className={maxConfig.textColor} />
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(stats.counts)
          .sort(([, a], [, b]) => b - a)
          .map(([key, count]) => {
            const emotion = key as EmotionType;
            const config = EMOTION_CONFIG[emotion];
            const percentage = Math.round((count / stats.total) * 100);

            return (
              <div key={emotion} className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                  <config.icon size={14} className={config.textColor} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[var(--text-primary)]">
                      {config.label}
                    </span>
                    <span className="text-[var(--text-muted)]">
                      {count}개 ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--secondary-light)]/30 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${config.textColor.replace(
                        "text",
                        "bg"
                      )}`}
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
