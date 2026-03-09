import pino from 'pino';

export function createLogger(serviceName: string, level = 'info') {
  return pino({
    level,
    base: {
      service: serviceName,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  });
}
