import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cropService } from '@agriconnect/services';
import { CropCycle, CropEvent } from '@agriconnect/types';

export const cropKeys = {
  all: ['crops'] as const,
  lists: () => [...cropKeys.all, 'list'] as const,
  details: () => [...cropKeys.all, 'detail'] as const,
  detail: (id: string) => [...cropKeys.details(), id] as const,
  events: (cropId: string) => [...cropKeys.detail(cropId), 'events'] as const,
};

// Fetch all crops
export const useCrops = () => {
  return useQuery({
    queryKey: cropKeys.lists(),
    queryFn: cropService.getCrops,
  });
};

// Fetch single crop by ID
export const useCrop = (id: string) => {
  return useQuery({
    queryKey: cropKeys.detail(id),
    queryFn: () => cropService.getCropById(id),
    enabled: !!id,
  });
};

// Create a new crop cycle
export const useCreateCrop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CropCycle, 'id'>) => cropService.createCrop(data),
    onSuccess: () => {
      // Invalidate and refetch crops list
      queryClient.invalidateQueries({ queryKey: cropKeys.lists() });
    },
  });
};

// Fetch events for a crop
export const useCropEvents = (cropId: string) => {
  return useQuery({
    queryKey: cropKeys.events(cropId),
    queryFn: () => cropService.getCropEvents(cropId),
    enabled: !!cropId,
  });
};

// Create a new crop event
export const useCreateCropEvent = (cropId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CropEvent, 'id' | 'cropCycleId'>) => cropService.createCropEvent(cropId, data),
    onSuccess: () => {
      // Invalidate and refetch events for this specific crop
      queryClient.invalidateQueries({ queryKey: cropKeys.events(cropId) });
    },
  });
};
