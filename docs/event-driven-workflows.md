# Event-Driven Workflows

## Crop Lifecycle Intelligence Flow

1. `crop-service` emits `CropEventLogged` to `crop.events`.
2. `analytics-service` consumes and updates yield/efficiency aggregations.
3. `ai-service` consumes and recomputes risk/yield predictions.
4. `advisory-service` consumes AI outcome and generates recommendations.
5. `notification-service` dispatches farmer alert over preferred channels.

## Marketplace Order Flow

1. `marketplace-service` emits `CropListed` and `BidPlaced` events.
2. `order-service` emits `OrderPlaced` after contract acceptance.
3. `payment-service` emits `PaymentCaptured`/`PaymentFailed`.
4. `notification-service` informs buyer/seller and admins.
5. `analytics-service` materializes GMV and conversion metrics.
