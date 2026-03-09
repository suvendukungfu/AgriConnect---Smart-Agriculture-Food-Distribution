import { Task } from '@agriconnect/types';
import { delay } from '../utils/delay';

export const tasksService = {
  getTasks: async (): Promise<Task[]> => {
    await delay(500);
    return [
      {
        id: '1',
        title: 'Irrigation',
        description: 'Field A needs watering',
        dueDate: new Date().toISOString(),
        priority: 'high',
        status: 'pending',
        category: 'irrigation',
      },
      {
        id: '2',
        title: 'Fertilizer Application',
        description: 'Apply Urea to Wheat crop',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        priority: 'medium',
        status: 'pending',
        category: 'fertilizer',
      },
      {
        id: '3',
        title: 'Pest Monitoring',
        description: 'Check Mustard crop for aphids',
        dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
        priority: 'medium',
        status: 'pending',
        category: 'pest_control',
      },
      {
        id: '4',
        title: 'Harvest Preparation',
        description: 'Prepare harvesters',
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        priority: 'low',
        status: 'pending',
        category: 'harvest',
      },
    ];
  },
};
