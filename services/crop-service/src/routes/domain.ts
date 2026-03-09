import type { FastifyInstance } from 'fastify';

export async function domainRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    domain: 'crops',
    service: 'crop-service',
    message: 'crop-service domain endpoint',
  }));

  app.post('/events', async (request) => {
    return {
      accepted: true,
      source: 'crop-service',
      payload: request.body,
    };
  });
}
