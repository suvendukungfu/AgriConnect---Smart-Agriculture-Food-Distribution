import { z } from 'zod';
export type UserRole = 'farmer' | 'buyer' | 'agronomist' | 'admin' | 'super_admin' | null;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["farmer", "buyer", "agronomist", "admin", "super_admin"]>;
    permissions: z.ZodArray<z.ZodString, "many">;
    region: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    email: string;
    role: "farmer" | "buyer" | "agronomist" | "admin" | "super_admin";
    permissions: string[];
    region?: string | undefined;
    avatarUrl?: string | undefined;
}, {
    id: string;
    name: string;
    email: string;
    role: "farmer" | "buyer" | "agronomist" | "admin" | "super_admin";
    permissions: string[];
    region?: string | undefined;
    avatarUrl?: string | undefined;
}>;
export type User = z.infer<typeof UserSchema>;
export interface AuthSession {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    sessionExpiry: number | null;
    isAuthenticated: boolean;
}
export interface Plot {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    cropType: string;
    soilHealth: number;
    yieldForecast: number;
    area: number;
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
export declare const CropCycleSchema: z.ZodObject<{
    id: z.ZodString;
    cropName: z.ZodString;
    variety: z.ZodString;
    sowingDate: z.ZodString;
    expectedHarvestDate: z.ZodString;
    plotId: z.ZodString;
    seedSource: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["seeded", "germination", "vegetative", "flowering", "grain_filling", "harvested"]>;
    yieldPrediction: z.ZodOptional<z.ZodNumber>;
    confidenceScore: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "seeded" | "germination" | "vegetative" | "flowering" | "grain_filling" | "harvested";
    cropName: string;
    variety: string;
    sowingDate: string;
    expectedHarvestDate: string;
    plotId: string;
    seedSource?: string | undefined;
    yieldPrediction?: number | undefined;
    confidenceScore?: number | undefined;
}, {
    id: string;
    status: "seeded" | "germination" | "vegetative" | "flowering" | "grain_filling" | "harvested";
    cropName: string;
    variety: string;
    sowingDate: string;
    expectedHarvestDate: string;
    plotId: string;
    seedSource?: string | undefined;
    yieldPrediction?: number | undefined;
    confidenceScore?: number | undefined;
}>;
export type CropCycle = z.infer<typeof CropCycleSchema>;
export declare const CropEventSchema: z.ZodObject<{
    id: z.ZodString;
    cropCycleId: z.ZodString;
    eventType: z.ZodEnum<["sowing", "irrigation", "fertilizer", "pesticide", "disease_report", "harvest"]>;
    date: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
    quantity: z.ZodOptional<z.ZodNumber>;
    cost: z.ZodOptional<z.ZodNumber>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    inputsUsed: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    date: string;
    cropCycleId: string;
    eventType: "sowing" | "irrigation" | "fertilizer" | "pesticide" | "disease_report" | "harvest";
    notes?: string | undefined;
    quantity?: number | undefined;
    cost?: number | undefined;
    images?: string[] | undefined;
    inputsUsed?: string | undefined;
}, {
    id: string;
    date: string;
    cropCycleId: string;
    eventType: "sowing" | "irrigation" | "fertilizer" | "pesticide" | "disease_report" | "harvest";
    notes?: string | undefined;
    quantity?: number | undefined;
    cost?: number | undefined;
    images?: string[] | undefined;
    inputsUsed?: string | undefined;
}>;
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
//# sourceMappingURL=index.d.ts.map