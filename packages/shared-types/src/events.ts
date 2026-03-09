export type DomainEventName =
  | 'FarmCreated'
  | 'CropEventLogged'
  | 'CropListed'
  | 'OrderPlaced'
  | 'YieldPredicted'
  | 'DiseaseDetected'
  | 'NdviCalculated';

export interface DomainEvent<T = Record<string, unknown>> {
  eventId: string;
  eventName: DomainEventName;
  topic: string;
  version: 'v1';
  occurredAt: string;
  producer: string;
  payload: T;
  traceId?: string;
}

export interface CropEventLoggedPayload {
  cropCycleId: string;
  farmId: string;
  eventType: string;
  occurredOn: string;
}

export interface OrderPlacedPayload {
  orderId: string;
  listingId: string;
  buyerId: string;
  quantity: number;
}
