import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@agriconnect/services';

export const useYieldPrediction = () => {
  return useQuery({
    queryKey: ['yield-prediction'],
    queryFn: analyticsService.getYieldPrediction,
    staleTime: 12 * 60 * 60 * 1000, // 12 hours
  });
};
