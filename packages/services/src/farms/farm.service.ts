import { FarmSummary } from '@agriconnect/types';
import { delay } from '../utils/delay';

export const farmService = {
  getSummary: async (): Promise<FarmSummary> => {
    await delay(600);
    return {
      totalFarms: 4,
      activeCrops: 12,
      upcomingHarvests: 3,
      expectedProductionTons: 24.5,
    };
  },
};
