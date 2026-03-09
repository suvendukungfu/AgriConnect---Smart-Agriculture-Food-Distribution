import 'fastify';
import type { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    verifyAccessToken: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireRoles: (allowed: string[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    authUser?: {
      sub: string;
      role: string;
      permissions?: string[];
    };
  }
}
