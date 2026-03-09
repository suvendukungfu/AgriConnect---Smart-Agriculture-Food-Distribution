import { useQuery } from '@tanstack/react-query';
import { farmService } from '@agriconnect/services';

export const useFarmSummary = () => {
  return useQuery({
    queryKey: ['farm-summary'],
    queryFn: farmService.getSummary,
    staleTime: 5 * 60 * 1000,
  });
};
