import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useStableDiffusion = (prompt: string) => {
  const { data, error } = useSWR(
    `/api/generate/stable-diffusion/${prompt}`,
    fetcher
  );

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
