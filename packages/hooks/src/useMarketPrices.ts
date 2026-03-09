import { useQuery } from '@tanstack/react-query';
import { marketService } from '@agriconnect/services';

export const useMarketPrices = () => {
  return useQuery({
    queryKey: ['market-prices'],
    queryFn: marketService.getPrices,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
