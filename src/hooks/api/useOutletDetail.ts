import { useQuery } from '@tanstack/react-query';
import ApiClientMock from '@/api/ApiClientMock';
import { OutletDetail } from '@/types';
import { ResponseData } from '@/types';

const apiClient = new ApiClientMock();

const fetchOutletDetails = async (outletId: string): Promise<OutletDetail | null | undefined> => {
  const response: ResponseData<OutletDetail> = await apiClient.fetchOutletDetails(outletId);

  if (response.statusCode === 200 && response.data) {
    return response.data;
  } else {
    throw new Error(response.error || 'Failed to fetch outlet details');
  }
};

export const useOutletDetails = (outletId: string) => {
  return useQuery<OutletDetail | undefined | null, Error>({
    queryKey: ['outletDetails', outletId],
    queryFn: () => fetchOutletDetails(outletId),
    retry: false,
  });
};
