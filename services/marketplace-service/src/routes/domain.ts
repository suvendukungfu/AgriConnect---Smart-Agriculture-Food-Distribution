import type { FastifyInstance } from 'fastify';

export async function domainRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    domain: 'marketplace',
    service: 'marketplace-service',
    message: 'marketplace-service domain endpoint',
  }));

  app.post('/events', async (request) => {
    return {
      accepted: true,
      source: 'marketplace-service',
      payload: request.body,
    };
  });
}
