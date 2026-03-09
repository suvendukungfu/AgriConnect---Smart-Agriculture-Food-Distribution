import type { FastifyInstance } from 'fastify';

export async function domainRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    domain: 'auth',
    service: 'auth-service',
    message: 'auth-service domain endpoint',
  }));

  app.post('/events', async (request) => {
    return {
      accepted: true,
      source: 'auth-service',
      payload: request.body,
    };
  });
}
