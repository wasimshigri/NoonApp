import { useQuery } from '@tanstack/react-query';
import ApiClientMock from '@/api/ApiClientMock';
import { SearchItem, ResponseData } from '@/types';

const apiClient = new ApiClientMock();

const searchOutletsAndItems = async (query: string): Promise<SearchItem[]> => {
  const response = await apiClient.search(query);
  if (response.statusCode === 200 && response.data) {
    return response.data;
  }
  throw new Error(response.error || 'Error searching outlets and items');
};

export const useSearch = (query: string) => {
  return useQuery<SearchItem[], Error>({
    queryKey: ['search', query],
    queryFn: () => searchOutletsAndItems(query),
    enabled: !!query, 
  });
};
