export const KAFKA_TOPICS = {
  FARM_EVENTS: 'farm.events',
  CROP_EVENTS: 'crop.events',
  MARKETPLACE_EVENTS: 'marketplace.events',
  ORDER_EVENTS: 'order.events',
  PAYMENT_EVENTS: 'payment.events',
  ADVISORY_EVENTS: 'advisory.events',
  AI_EVENTS: 'ai.events',
  SATELLITE_EVENTS: 'satellite.events',
  NOTIFICATION_EVENTS: 'notification.events',
  ADMIN_EVENTS: 'admin.events',
} as const;

export type KafkaTopic = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS];
