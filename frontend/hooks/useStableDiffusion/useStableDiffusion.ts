import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useStableDiffusion = (prompt: string) => {
  const { data, error } = useSWR(
    `/api/generate/stable-diffusion/${prompt}`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
