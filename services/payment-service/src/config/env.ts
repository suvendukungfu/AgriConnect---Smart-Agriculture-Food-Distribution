import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const EnvSchema = z.object({
  SERVICE_NAME: z.string().default('payment-service'),
  PORT: z.coerce.number().default(4007),
  LOG_LEVEL: z.string().default('info'),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  KAFKA_BROKERS: z.string().min(1)
});

export const env = EnvSchema.parse(process.env);
