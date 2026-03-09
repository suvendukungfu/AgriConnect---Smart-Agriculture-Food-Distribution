# AgriConnect Backend Service Matrix

| Service | Primary Domain | Core Data Stores | Key Events Produced |
|---|---|---|---|
| auth-service | Authentication, sessions, RBAC | PostgreSQL, Redis | UserSignedIn, SessionRefreshed |
| user-service | User profile and settings | PostgreSQL | UserProfileUpdated |
| farm-service | Farms, plots, soil, irrigation | PostgreSQL + PostGIS | FarmCreated |
| crop-service | Crop lifecycle and logs | PostgreSQL | CropEventLogged |
| marketplace-service | Listings, bids, contracts | PostgreSQL, Elasticsearch | CropListed |
| order-service | Orders, deliveries, tracking | PostgreSQL | OrderPlaced |
| payment-service | Payments, refunds, reconciliation | PostgreSQL, Redis | PaymentCaptured |
| notification-service | Email/SMS/WhatsApp/Push | Redis, Kafka | NotificationDispatched |
| advisory-service | Recommendations and alerts | PostgreSQL, Redis | AdvisoryAlertRaised |
| analytics-service | Metrics and trends | PostgreSQL, data warehouse pattern | MetricsMaterialized |
| satellite-service | NDVI and satellite processing | S3/MinIO, PostGIS | NdviCalculated |
| ai-service | Disease detection and predictions | S3/MinIO, model registry | DiseaseDetected, YieldPredicted |
| admin-service | Moderation and audit controls | PostgreSQL | AdminActionLogged |

## Async Workflow Example
1. `CropEventLogged` is produced by crop-service.
2. analytics-service consumes and updates farm performance metrics.
3. ai-service consumes and recalculates yield/risk inference.
4. advisory-service consumes AI output and creates recommendation.
5. notification-service consumes advisory event and sends farmer alert.
