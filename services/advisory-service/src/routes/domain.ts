import type { FastifyInstance } from 'fastify';

export async function domainRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    domain: 'advisory',
    service: 'advisory-service',
    message: 'advisory-service domain endpoint',
  }));

  app.post('/events', async (request) => {
    return {
      accepted: true,
      source: 'advisory-service',
      payload: request.body,
    };
  });
}
