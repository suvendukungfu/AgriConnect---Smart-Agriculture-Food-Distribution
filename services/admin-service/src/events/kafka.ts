import { Kafka } from 'kafkajs';
import { env } from '../config/env.js';

export const kafka = new Kafka({
  clientId: 'admin-service',
  brokers: env.KAFKA_BROKERS.split(',').map((v) => v.trim()),
});

export async function publishDomainEvent(topic: string, key: string, payload: unknown) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ key, value: JSON.stringify(payload) }],
  });
  await producer.disconnect();
}
