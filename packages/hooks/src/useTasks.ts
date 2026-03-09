import { useQuery } from '@tanstack/react-query';
import { tasksService } from '@agriconnect/services';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: tasksService.getTasks,
    staleTime: 5 * 60 * 1000,
  });
};
