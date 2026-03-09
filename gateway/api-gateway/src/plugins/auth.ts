import fp from 'fastify-plugin';
import type { FastifyReply, FastifyRequest } from 'fastify';

export const authPlugin = fp(async (app) => {
  app.decorate('verifyAccessToken', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return reply.code(401).send({ error: 'Missing access token' });
      }

      const payload = await request.jwtVerify<{
        sub: string;
        role: string;
        permissions?: string[];
      }>();

      request.authUser = payload;
    } catch {
      return reply.code(401).send({ error: 'Invalid access token' });
    }
  });

  app.decorate('requireRoles', (allowed: string[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const role = request.authUser?.role;
      if (!role || !allowed.includes(role)) {
        return reply.code(403).send({ error: 'Forbidden' });
      }
    };
  });
});
