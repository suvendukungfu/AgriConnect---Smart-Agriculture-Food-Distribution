import { z } from 'zod';

export type UserRole = 'farmer' | 'buyer' | 'agronomist' | 'admin' | 'super_admin' | null;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['farmer', 'buyer', 'agronomist', 'admin', 'super_admin']),
  permissions: z.array(z.string()),
  region: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export interface AuthSession {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  sessionExpiry: number | null; // Timestamp
  isAuthenticated: boolean;
}

// AgriConnect Platform Specific Types
export interface Plot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  cropType: string;
  soilHealth: number; // pH
  yieldForecast: number;
  area: number; // Acreage
  irrigationType: 'drip' | 'sprinkler' | 'flood' | 'rainfed';
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  totalArea: number;
  soilType: string;
  plots: Plot[];
  ownerId: string;
}

export const CropCycleSchema = z.object({
  id: z.string(),
  cropName: z.string(),
  variety: z.string(),
  sowingDate: z.string(),
  expectedHarvestDate: z.string(),
  plotId: z.string(),
  seedSource: z.string().optional(),
  status: z.enum(['seeded', 'germination', 'vegetative', 'flowering', 'grain_filling', 'harvested']),
  yieldPrediction: z.number().optional(),
  confidenceScore: z.number().optional(),
});

export type CropCycle = z.infer<typeof CropCycleSchema>;

export const CropEventSchema = z.object({
  id: z.string(),
  cropCycleId: z.string(),
  eventType: z.enum(['sowing', 'irrigation', 'fertilizer', 'pesticide', 'disease_report', 'harvest']),
  date: z.string(),
  notes: z.string().optional(),
  quantity: z.number().optional(),
  cost: z.number().optional(),
  images: z.array(z.string()).optional(),
  inputsUsed: z.string().optional(),
});

export type CropEvent = z.infer<typeof CropEventSchema>;

export interface WeatherData {
  temp: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
  }>;
}

export interface MarketPrice {
  crop: string;
  currentPrice: number;
  currency: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: Array<{
    date: string;
    price: number;
  }>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  category: 'irrigation' | 'fertilizer' | 'pest_control' | 'harvest';
}
