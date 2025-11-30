export type EmotionType = "JOY" | "SAD" | "ANGRY" | "FEAR" | "MUMBLE";

export interface DreamRecord {
  id: number;
  userId: number;
  keywords: string[];
  description: string;
  emotion: EmotionType;
  createdAt: string;
  imageUrl?: string;
  aiSummary?: string;
}


export interface DreamResponse<T = DreamRecord> {
  code: number;
  message: string;
  data: T;
}
