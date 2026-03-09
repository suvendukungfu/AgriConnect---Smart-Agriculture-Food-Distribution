import { WeatherData } from '@agriconnect/types';
import { delay } from '../utils/delay';

export const weatherService = {
  getWeather: async (): Promise<WeatherData> => {
    await delay(500);
    return {
      temp: 29,
      humidity: 65,
      rainfall: 0,
      windSpeed: 12,
      condition: 'Sunny',
      forecast: [
        { date: 'Today', temp: 29, condition: '🌤' },
        { date: 'Tomorrow', temp: 25, condition: '🌧' },
        { date: 'Day 3', temp: 31, condition: '☀️' },
      ],
    };
  },
};
