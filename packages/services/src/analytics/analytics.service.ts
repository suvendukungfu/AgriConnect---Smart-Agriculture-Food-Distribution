import { YieldPredictionData, CropHealthStatus } from '@agriconnect/types';
import { delay } from '../utils/delay';

export const analyticsService = {
  getYieldPrediction: async (): Promise<YieldPredictionData> => {
    await delay(800);
    return {
      predictedYield: 24.5,
      confidenceScore: 94,
      history: [
        { month: 'Jan', yield: 18 },
        { month: 'Feb', yield: 19.5 },
        { month: 'Mar', yield: 22 },
        { month: 'Apr', yield: 23 },
        { month: 'May', yield: 24 },
        { month: 'Jun', yield: 24.5 },
      ],
    };
  },

  getCropHealth: async (): Promise<CropHealthStatus[]> => {
    await delay(600);
    return [
      { cropName: 'Wheat', status: 'Healthy' },
      { cropName: 'Mustard', status: 'Warning', issue: 'Pest Risk' },
      { cropName: 'Rice', status: 'Risk', issue: 'Nutrient Deficiency' },
    ];
  },
};
