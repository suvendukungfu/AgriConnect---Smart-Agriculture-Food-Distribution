import type { FastifyInstance } from 'fastify';
import httpProxy from '@fastify/http-proxy';
import { env } from '../config/env.js';

const PROXIES = [
  { prefix: '/api/auth', target: env.AUTH_SERVICE_URL, secure: false },
  { prefix: '/api/users', target: env.USER_SERVICE_URL, secure: true },
  { prefix: '/api/farms', target: env.FARM_SERVICE_URL, secure: true },
  { prefix: '/api/crops', target: env.CROP_SERVICE_URL, secure: true },
  { prefix: '/api/marketplace', target: env.MARKETPLACE_SERVICE_URL, secure: true },
  { prefix: '/api/orders', target: env.ORDER_SERVICE_URL, secure: true },
  { prefix: '/api/payments', target: env.PAYMENT_SERVICE_URL, secure: true },
  { prefix: '/api/notifications', target: env.NOTIFICATION_SERVICE_URL, secure: true },
  { prefix: '/api/advisory', target: env.ADVISORY_SERVICE_URL, secure: true },
  { prefix: '/api/analytics', target: env.ANALYTICS_SERVICE_URL, secure: true },
  { prefix: '/api/satellite', target: env.SATELLITE_SERVICE_URL, secure: true },
  { prefix: '/api/ai', target: env.AI_SERVICE_URL, secure: true },
  { prefix: '/api/admin', target: env.ADMIN_SERVICE_URL, secure: true }
] as const;

export async function proxyRoutes(app: FastifyInstance) {
  for (const proxy of PROXIES) {
    await app.register(httpProxy as any, {
      upstream: proxy.target,
      prefix: proxy.prefix,
      rewritePrefix: '/',
      preHandler: proxy.secure ? app.verifyAccessToken : undefined,
    });
  }
}
