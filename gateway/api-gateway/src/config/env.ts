import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().default(8080),
  GATEWAY_JWT_PUBLIC_KEY: z.string().min(1),
  RATE_LIMIT_MAX: z.coerce.number().default(200),
  RATE_LIMIT_TIME_WINDOW: z.string().default('1 minute'),
  AUTH_SERVICE_URL: z.string().url(),
  USER_SERVICE_URL: z.string().url(),
  FARM_SERVICE_URL: z.string().url(),
  CROP_SERVICE_URL: z.string().url(),
  MARKETPLACE_SERVICE_URL: z.string().url(),
  ORDER_SERVICE_URL: z.string().url(),
  PAYMENT_SERVICE_URL: z.string().url(),
  NOTIFICATION_SERVICE_URL: z.string().url(),
  ADVISORY_SERVICE_URL: z.string().url(),
  ANALYTICS_SERVICE_URL: z.string().url(),
  SATELLITE_SERVICE_URL: z.string().url(),
  AI_SERVICE_URL: z.string().url(),
  ADMIN_SERVICE_URL: z.string().url()
});

export const env = EnvSchema.parse(process.env);
