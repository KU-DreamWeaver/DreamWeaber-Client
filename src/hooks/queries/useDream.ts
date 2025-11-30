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

import { DUMMY_DREAMS } from '../../mocks/dreams';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getDreams = async (_month: string): Promise<DreamResponse<DreamRecord[]>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    code: 200,
    message: "Success",
    data: DUMMY_DREAMS
  };
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
