import { apiClient } from '../api';
import { CropCycle, CropEvent } from '@agriconnect/types';

export const cropService = {
  // Get all crops for the logged in user
  getCrops: async (): Promise<CropCycle[]> => {
    // const response = await apiClient.get<CropCycle[]>('/crops');
    // return response.data;
    
    // Mock Data for now
    return [
      {
        id: 'crop-1',
        cropName: 'Wheat',
        variety: 'PBW-343',
        sowingDate: '2025-11-12T00:00:00.000Z',
        expectedHarvestDate: '2026-04-10T00:00:00.000Z',
        plotId: 'plot-a',
        status: 'vegetative',
        yieldPrediction: 12.5,
        confidenceScore: 0.94,
      },
      {
        id: 'crop-2',
        cropName: 'Mustard',
        variety: 'Pusa Bold',
        sowingDate: '2025-10-15T00:00:00.000Z',
        expectedHarvestDate: '2026-03-20T00:00:00.000Z',
        plotId: 'plot-b',
        status: 'flowering',
        yieldPrediction: 4.2,
        confidenceScore: 0.88,
      }
    ];
  },

  // Get a single crop
  getCropById: async (id: string): Promise<CropCycle> => {
    // const response = await apiClient.get<CropCycle>(`/crops/${id}`);
    // return response.data;
    
    return {
      id,
      cropName: 'Wheat',
      variety: 'PBW-343',
      sowingDate: '2025-11-12T00:00:00.000Z',
      expectedHarvestDate: '2026-04-10T00:00:00.000Z',
      plotId: 'plot-a',
      status: 'vegetative',
      yieldPrediction: 12.5,
      confidenceScore: 0.94,
    };
  },

  // Create a new crop cycle
  createCrop: async (data: Omit<CropCycle, 'id'>): Promise<CropCycle> => {
    const response = await apiClient.post<CropCycle>('/crops', data);
    return response.data;
  },

  // Get events for a specific crop
  getCropEvents: async (cropId: string): Promise<CropEvent[]> => {
    // const response = await apiClient.get<CropEvent[]>(`/crops/${cropId}/events`);
    // return response.data;

    return [
      {
        id: 'evt-1',
        cropCycleId: cropId,
        eventType: 'sowing',
        date: '2025-11-12T10:00:00.000Z',
        inputsUsed: 'PBW-343 Seeds',
        quantity: 100,
        cost: 2500,
      },
      {
        id: 'evt-2',
        cropCycleId: cropId,
        eventType: 'irrigation',
        date: '2025-11-20T08:00:00.000Z',
        notes: 'First watering after sowing',
      },
      {
        id: 'evt-3',
        cropCycleId: cropId,
        eventType: 'fertilizer',
        date: '2025-12-02T09:30:00.000Z',
        inputsUsed: 'NPK 19:19:19',
        quantity: 50,
        cost: 1500,
      }
    ];
  },

  // Create a new crop event
  createCropEvent: async (cropId: string, data: Omit<CropEvent, 'id' | 'cropCycleId'>): Promise<CropEvent> => {
    const response = await apiClient.post<CropEvent>(`/crops/${cropId}/events`, data);
    return response.data;
  }
};
