import { tokenisePrompt } from '@/functions/prompts';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useStableDiffusion = (
  prompt: string,
  userId: string | undefined
) => {
  const tokenised = tokenisePrompt(prompt);
  const { data, error } = useSWR(
    userId
      ? `/api/generate/stable-diffusion/${tokenised}?userId=${userId}`
      : `/api/generate/stable-diffusion/${tokenised}`,
    fetcher
  );

  const isLoading = !error && !data;

  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
};
