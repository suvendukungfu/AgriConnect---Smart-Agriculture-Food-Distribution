import { kafka } from './kafka.js';

export async function startNotificationConsumers() {
  const consumer = kafka.consumer({ groupId: 'notification-service-v1' });
  await consumer.connect();

  await consumer.subscribe({ topic: 'advisory.events', fromBeginning: false });
  await consumer.subscribe({ topic: 'ai.events', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;
      const payload = JSON.parse(message.value.toString());
      // Route notification job to channel adapters: SMS, WhatsApp, email, push.
      console.log(`[notification-service] consumed ${topic}`, payload.eventName ?? 'unknown');
    },
  });
}
