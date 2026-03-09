import Fastify from 'fastify';
import { env } from './config/env.js';
import { healthRoutes } from './routes/health.js';
import { domainRoutes } from './routes/domain.js';

const app = Fastify({
  logger: {
    level: env.LOG_LEVEL,
  },
});

await app.register(healthRoutes);
await app.register(domainRoutes, { prefix: '/api/orders' });

app.setErrorHandler((error, _request, reply) => {
  const err = error as { statusCode?: number; message: string };
  reply.code(err.statusCode ?? 500).send({
    error: 'Service request failed',
    message: err.message,
  });
});

await app.listen({ port: env.PORT, host: '0.0.0.0' });
