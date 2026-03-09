import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import { env } from '../config/env.js';

export const httpPlugin = fp(async (app) => {
  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_TIME_WINDOW,
    allowList: ['127.0.0.1'],
  });

  await app.register(jwt, {
    secret: env.GATEWAY_JWT_PUBLIC_KEY,
    verify: {
      algorithms: ['HS256', 'RS256'],
    },
  });
});
