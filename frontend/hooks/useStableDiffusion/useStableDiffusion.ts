import useSWR from 'swr';

const fetcher = (url: string) => {
  console.log('fetcher', url);
  fetch(url).then((r) => r.json());
};

export const useStableDiffusion = (
  prompt: string,
  userId: string | undefined
) => {
  console.log('useStableDiffusion', prompt, userId);
  const { data, error } = useSWR(
    userId
      ? `/api/generate/stable-diffusion/${prompt}?userId=${userId}`
      : `/api/generate/stable-diffusion/${prompt}`,
    fetcher
  );

  const isLoading = !error || !data;

  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
};
