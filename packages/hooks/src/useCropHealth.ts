import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@agriconnect/services';

export const useCropHealth = () => {
  return useQuery({
    queryKey: ['crop-health'],
    queryFn: analyticsService.getCropHealth,
    staleTime: 5 * 60 * 1000,
  });
};
