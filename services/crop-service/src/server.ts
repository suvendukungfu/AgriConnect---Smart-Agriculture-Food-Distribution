import Fastify from 'fastify';

const server = Fastify({ logger: true });

server.get('/health', async () => {
  return { status: 'ok', service: 'crop-service' };
});

const start = async () => {
  try {
    await server.listen({ port: 0, host: '0.0.0.0' }); // Port assigned dynamically or by env
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
