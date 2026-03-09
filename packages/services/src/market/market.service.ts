import { MarketPrice } from '@agriconnect/types';
import { delay } from '../utils/delay';

export const marketService = {
  getPrices: async (): Promise<MarketPrice[]> => {
    await delay(700);
    return [
      {
        crop: 'Wheat',
        currentPrice: 2100,
        currency: '₹',
        unit: 'quintal',
        trend: 'up',
        history: [
          { date: 'Mon', price: 1950 },
          { date: 'Tue', price: 2000 },
          { date: 'Wed', price: 1980 },
          { date: 'Thu', price: 2050 },
          { date: 'Fri', price: 2100 },
          { date: 'Sat', price: 2080 },
          { date: 'Sun', price: 2100 },
        ],
      },
      {
        crop: 'Rice',
        currentPrice: 1850,
        currency: '₹',
        unit: 'quintal',
        trend: 'down',
        history: [
          { date: 'Mon', price: 1950 },
          { date: 'Tue', price: 1920 },
          { date: 'Wed', price: 1900 },
          { date: 'Thu', price: 1880 },
          { date: 'Fri', price: 1850 },
          { date: 'Sat', price: 1860 },
          { date: 'Sun', price: 1850 },
        ],
      },
    ];
  },
};
