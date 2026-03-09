import { useQuery } from '@tanstack/react-query';
import { weatherService } from '@agriconnect/services';

export const useWeather = () => {
  return useQuery({
    queryKey: ['weather'],
    queryFn: weatherService.getWeather,
    staleTime: 15 * 60 * 1000,
  });
};
