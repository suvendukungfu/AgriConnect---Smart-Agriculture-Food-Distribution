import { Kafka, type Producer, type Consumer } from 'kafkajs';

export function buildKafkaClient(clientId: string, brokers: string[]) {
  return new Kafka({ clientId, brokers });
}

export async function withProducer(
  kafka: Kafka,
  action: (producer: Producer) => Promise<void>
) {
  const producer = kafka.producer();
  await producer.connect();
  try {
    await action(producer);
  } finally {
    await producer.disconnect();
  }
}

export async function withConsumer(
  kafka: Kafka,
  groupId: string,
  action: (consumer: Consumer) => Promise<void>
) {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  try {
    await action(consumer);
  } finally {
    await consumer.disconnect();
  }
}
