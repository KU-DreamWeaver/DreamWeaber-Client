import type { DreamRecord } from "../types/dream";

export const DUMMY_DREAMS: DreamRecord[] = [
  {
    id: 1,
    userId: 1,
    keywords: ["하늘", "비행", "자유"],
    description: "푸른 하늘을 자유롭게 날아다니는 꿈을 꾸었습니다. 바람이 시원하게 느껴졌고, 아래로 보이는 풍경이 정말 아름다웠습니다. 마치 새가 된 기분이었습니다.",
    emotion: "JOY",
    createdAt: new Date().toISOString(), // Today
    imageUrl: "https://images.unsplash.com/photo-1500491460312-c32fc2dbc751?q=80&w=2070&auto=format&fit=crop",
    aiSummary: "자유와 해방감을 상징하는 길몽입니다. 현재 진행 중인 일이 순조롭게 풀릴 징조입니다."
  },
  {
    id: 2,
    userId: 1,
    keywords: ["추격", "어둠", "괴물"],
    description: "어두운 골목길에서 정체를 알 수 없는 그림자에게 쫓기는 꿈이었습니다. 도망치려고 했지만 다리가 움직이지 않아 너무 무서웠습니다.",
    emotion: "FEAR",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2037&auto=format&fit=crop",
    aiSummary: "심리적인 압박감이나 스트레스를 받고 있음을 나타냅니다. 휴식이 필요합니다."
  },
  {
    id: 3,
    userId: 1,
    keywords: ["시험", "실패", "눈물"],
    description: "중요한 시험을 보는데 답안지가 백지로 변해버려서 당황하는 꿈이었습니다. 너무 억울해서 펑펑 울었습니다.",
    emotion: "SAD",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    imageUrl: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=2068&auto=format&fit=crop",
    aiSummary: "준비하고 있는 일에 대한 불안감이 반영된 꿈입니다. 자신감을 가지세요."
  },
  {
    id: 4,
    userId: 1,
    keywords: ["바다", "평화", "거북이"],
    description: "에메랄드 빛 바다에서 거북이와 함께 수영하는 꿈이었습니다. 물이 따뜻하고 마음이 편안했습니다.",
    emotion: "JOY",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=2000&auto=format&fit=crop",
    aiSummary: "재물운과 건강운이 상승하는 아주 좋은 꿈입니다."
  },
];
