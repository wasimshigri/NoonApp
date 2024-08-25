import ApiClientMock from '@/api/ApiClientMock';
import { PromoItem } from '@/types';
import {useQuery} from '@tanstack/react-query';

const apiClient = new ApiClientMock();

const fetchPromoItems = async (): Promise<PromoItem[]> => {
  const response = await apiClient.fetchPromoItems();
  if (response.statusCode === 200 && response.data) {
    return response.data;
  } else {
    throw new Error(response.error || 'Failed to fetch promo items');
  }
};

export const usePromoItems = () => {
  return useQuery<PromoItem[], Error>({
    queryKey: ['promoItems'],
    queryFn: fetchPromoItems,
    retry: 3,
    staleTime: 1000 * 60 * 30,
  });
};
