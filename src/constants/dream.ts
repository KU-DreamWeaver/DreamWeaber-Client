import { Smile, Frown, Angry, Ghost, HelpCircle } from "lucide-react";
import type { EmotionType } from "../types/dream";

export interface EmotionConfig {
  value: EmotionType;
  label: string;
  icon: React.ElementType;
  color: string;     // Icon color
  bg: string;        // Badge background
  textColor: string; // Badge text color
}

export const EMOTIONS: EmotionConfig[] = [
  { 
    value: "JOY", 
    label: "기쁨", 
    icon: Smile, 
    color: "text-[#FF9966]", 
    bg: "bg-yellow-100", 
    textColor: "text-yellow-700" 
  },
  { 
    value: "SAD", 
    label: "슬픔", 
    icon: Frown, 
    color: "text-[#5B86E5]", 
    bg: "bg-blue-100", 
    textColor: "text-blue-700" 
  },
  { 
    value: "ANGRY", 
    label: "분노", 
    icon: Angry, 
    color: "text-[#EF4444]", 
    bg: "bg-red-100", 
    textColor: "text-red-700" 
  },
  { 
    value: "FEAR", 
    label: "무서움", 
    icon: Ghost, 
    color: "text-purple-500", 
    bg: "bg-purple-100", 
    textColor: "text-purple-700" 
  },
  { 
    value: "MUMBLE", 
    label: "모름", 
    icon: HelpCircle, 
    color: "text-gray-500", 
    bg: "bg-gray-100", 
    textColor: "text-gray-700" 
  },
];

export const getEmotionConfig = (emotion: EmotionType) => {
  return EMOTIONS.find((e) => e.value === emotion) || EMOTIONS[4]; // Default to MUMBLE
};
