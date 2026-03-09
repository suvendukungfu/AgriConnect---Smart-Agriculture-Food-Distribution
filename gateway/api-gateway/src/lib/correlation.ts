import { randomUUID } from 'node:crypto';

export function getOrCreateCorrelationId(value?: string) {
  return value && value.trim().length > 0 ? value : randomUUID();
}
