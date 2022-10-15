import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useStableDiffusion = (
  prompt: string,
  userId: string | undefined
) => {
  const key = userId
    ? `/api/generate/stable-diffusion/${prompt}?userId=${userId}`
    : `/api/generate/stable-diffusion/${prompt}`;
  const { data, error } = useSWR(key, fetcher);

  const isLoading = !error && !data;
  if (isLoading) {
    return {
      data: { images: ['0'] },
      isLoading: isLoading,
      isError: error,
    };
  }

  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
};
