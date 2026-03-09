import type { FastifyInstance } from 'fastify';

export async function domainRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    domain: 'users',
    service: 'user-service',
    message: 'user-service domain endpoint',
  }));

  app.post('/events', async (request) => {
    return {
      accepted: true,
      source: 'user-service',
      payload: request.body,
    };
  });
}
