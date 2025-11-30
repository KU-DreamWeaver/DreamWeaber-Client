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
  return client.post('/api/dreamhistories', {
    ...payload,
    userId: 1, // Hardcoded as per requirements
  });
};

const getDreams = async (month: string): Promise<DreamResponse<DreamRecord[]>> => {
  return client.get('/api/dreamhistories', {
    params: { month },
  });
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

export const useDreamsQuery = (month: string) => {
  return useQuery({
    queryKey: ['dreams', month],
    queryFn: () => getDreams(month),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
