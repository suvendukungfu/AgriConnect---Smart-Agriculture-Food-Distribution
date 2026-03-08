"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropEventSchema = exports.CropCycleSchema = exports.UserSchema = void 0;
var zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(['farmer', 'buyer', 'agronomist', 'admin', 'super_admin']),
    permissions: zod_1.z.array(zod_1.z.string()),
    region: zod_1.z.string().optional(),
    avatarUrl: zod_1.z.string().optional(),
});
exports.CropCycleSchema = zod_1.z.object({
    id: zod_1.z.string(),
    cropName: zod_1.z.string(),
    variety: zod_1.z.string(),
    sowingDate: zod_1.z.string(),
    expectedHarvestDate: zod_1.z.string(),
    plotId: zod_1.z.string(),
    seedSource: zod_1.z.string().optional(),
    status: zod_1.z.enum(['seeded', 'germination', 'vegetative', 'flowering', 'grain_filling', 'harvested']),
    yieldPrediction: zod_1.z.number().optional(),
    confidenceScore: zod_1.z.number().optional(),
});
exports.CropEventSchema = zod_1.z.object({
    id: zod_1.z.string(),
    cropCycleId: zod_1.z.string(),
    eventType: zod_1.z.enum(['sowing', 'irrigation', 'fertilizer', 'pesticide', 'disease_report', 'harvest']),
    date: zod_1.z.string(),
    notes: zod_1.z.string().optional(),
    quantity: zod_1.z.number().optional(),
    cost: zod_1.z.number().optional(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    inputsUsed: zod_1.z.string().optional(),
});
