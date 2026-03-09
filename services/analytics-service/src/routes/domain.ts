import type { FastifyInstance } from 'fastify';

export async function domainRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    domain: 'analytics',
    service: 'analytics-service',
    message: 'analytics-service domain endpoint',
  }));

  app.post('/events', async (request) => {
    return {
      accepted: true,
      source: 'analytics-service',
      payload: request.body,
    };
  });
}
