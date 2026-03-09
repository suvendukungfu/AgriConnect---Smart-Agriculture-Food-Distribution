import type { FastifyInstance } from 'fastify';

export async function domainRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    domain: 'admin',
    service: 'admin-service',
    message: 'admin-service domain endpoint',
  }));

  app.post('/events', async (request) => {
    return {
      accepted: true,
      source: 'admin-service',
      payload: request.body,
    };
  });
}
