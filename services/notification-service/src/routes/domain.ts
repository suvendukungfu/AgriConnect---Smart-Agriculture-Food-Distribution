import type { FastifyInstance } from 'fastify';

export async function domainRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    domain: 'notifications',
    service: 'notification-service',
    message: 'notification-service domain endpoint',
  }));

  app.post('/events', async (request) => {
    return {
      accepted: true,
      source: 'notification-service',
      payload: request.body,
    };
  });
}
