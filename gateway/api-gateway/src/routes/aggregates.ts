import type { FastifyInstance } from 'fastify';

export async function aggregateRoutes(app: FastifyInstance) {
  app.get('/api/dashboard/summary', {
    preHandler: [(app as any).verifyAccessToken],
  }, async (_request, _reply) => {
    // Production implementation would fan out to farm/crop/advisory/analytics services.
    return {
      message: 'Dashboard aggregate endpoint',
      sourceServices: ['farm-service', 'crop-service', 'advisory-service', 'analytics-service'],
    };
  });
}
