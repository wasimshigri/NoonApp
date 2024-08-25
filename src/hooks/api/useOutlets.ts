import ApiClientMock from '@/api/ApiClientMock';
import { Outlet, PromoItem } from '@/types';
import {useQuery} from '@tanstack/react-query';

const apiClient = new ApiClientMock();

const fetchOutlets = async (): Promise<Outlet[]> => {
  const response = await  apiClient.fetchOutlets();
  if (response.statusCode === 200 && response.data) {
    return response.data;
  } else {
    throw new Error(response.error || 'Failed to fetch outlets');
  }
};

export const useOutlets = () => {
  return useQuery<Outlet[], Error>({
    queryKey: ['outlets'],
    queryFn: fetchOutlets,
  });
};
