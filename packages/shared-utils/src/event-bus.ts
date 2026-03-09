import { Kafka } from 'kafkajs';

export function createEventBus(clientId: string, brokers: string[]) {
  const kafka = new Kafka({ clientId, brokers });

  return {
    async publish(topic: string, key: string, payload: unknown) {
      const producer = kafka.producer();
      await producer.connect();
      try {
        await producer.send({
          topic,
          messages: [{ key, value: JSON.stringify(payload) }],
        });
      } finally {
        await producer.disconnect();
      }
    },

    async subscribe(
      topic: string,
      groupId: string,
      onMessage: (data: unknown) => Promise<void>
    ) {
      const consumer = kafka.consumer({ groupId });
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: false });

      await consumer.run({
        eachMessage: async ({ message }) => {
          if (!message.value) return;
          const raw = message.value.toString();
          await onMessage(JSON.parse(raw));
        },
      });

      return async () => {
        await consumer.disconnect();
      };
    },
  };
}
