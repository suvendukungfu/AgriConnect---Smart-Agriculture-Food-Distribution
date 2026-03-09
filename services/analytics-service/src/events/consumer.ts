import { kafka } from './kafka.js';

export async function startAnalyticsConsumers() {
  const consumer = kafka.consumer({ groupId: 'analytics-service-v1' });
  await consumer.connect();

  await consumer.subscribe({ topic: 'crop.events', fromBeginning: false });
  await consumer.subscribe({ topic: 'order.events', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;
      const payload = JSON.parse(message.value.toString());
      // Materialize aggregated metrics in OLAP/warehouse sink.
      console.log(`[analytics-service] consumed ${topic}`, payload.eventName ?? 'unknown');
    },
  });
}
