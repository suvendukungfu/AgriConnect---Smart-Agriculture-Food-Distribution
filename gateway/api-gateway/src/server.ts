import Fastify from 'fastify';
import { env } from './config/env.js';
import { getOrCreateCorrelationId } from './lib/correlation.js';
import { authPlugin } from './plugins/auth.js';
import { httpPlugin } from './plugins/http.js';
import { healthRoutes } from './routes/health.js';
import { aggregateRoutes } from './routes/aggregates.js';
import { proxyRoutes } from './routes/proxy.js';

const app = Fastify({
  logger: {
    level: 'info',
  },
  disableRequestLogging: true,
});

await app.register(httpPlugin);
await app.register(authPlugin);

app.addHook('onRequest', async (request, reply) => {
  const correlationId = getOrCreateCorrelationId(
    request.headers['x-correlation-id'] as string | undefined
  );

  request.headers['x-correlation-id'] = correlationId;
  reply.header('x-correlation-id', correlationId);
});

app.addHook('onResponse', async (request, reply) => {
  request.log.info(
    {
      method: request.method,
      path: request.url,
      statusCode: reply.statusCode,
      correlationId: request.headers['x-correlation-id'],
    },
    'request.completed'
  );
});

await app.register(healthRoutes);
await app.register(aggregateRoutes);
await app.register(proxyRoutes);

app.setErrorHandler((error, request, reply) => {
  const err = error as { statusCode?: number; message: string };
  request.log.error({ err: error }, 'gateway.error');
  reply.code(err.statusCode ?? 500).send({
    error: 'Gateway request failed',
    message: err.message,
  });
});

await app.listen({
  port: env.PORT,
  host: '0.0.0.0',
});
