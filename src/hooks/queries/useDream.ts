import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../../api/client';
import type { DreamRecord, DreamResponse, EmotionType } from '../../types/dream';

interface CreateDreamPayload {
  keywords: string[];
  description: string;
  emotion: EmotionType;
  imageUrl?: string;
}

const createDream = async (payload: CreateDreamPayload): Promise<DreamResponse> => {
  return client.post('/dreamhistories', {
    ...payload,
    userId: 1, // Hardcoded as per requirements
  });
};

const getDreams = async (userId: number = 1): Promise<DreamResponse<DreamRecord[]>> => {
  return client.get(`/dreamhistories/${userId}`);
};


export const useCreateDreamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDream,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dreams'] });
    },
  });
};

export const useDreamsQuery = () => {
  return useQuery({
    queryKey: ['dreams'],
    queryFn: () => getDreams(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
