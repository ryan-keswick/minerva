import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useUser = (prompt: string) => {
  const { data, error } = useSWR(
    `/api/generate/stable-diffusion/${prompt}`,
    fetcher
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
