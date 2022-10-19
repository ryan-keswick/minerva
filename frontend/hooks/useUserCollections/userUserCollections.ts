import useSWR from 'swr';
import type { ResponseData } from '@/pages/api/user/collections/[userId]';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useUserCollections = (userId: string) => {
  const { data, error } = useSWR<ResponseData>(
    `/api/user/collections/${userId}`,
    fetcher
  );

  const isLoading = !error && !data;

  return {
    collections: data?.collections,
    isLoading: isLoading,
    isError: error,
  };
};
