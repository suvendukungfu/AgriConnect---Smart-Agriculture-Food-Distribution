# AgriConnect Enterprise Backend Architecture

## Overview
AgriConnect backend is designed as a domain-driven, event-driven microservices platform for farmers, buyers, agronomists, and admins. The architecture emphasizes horizontal scalability, resilience, and observability.

## Core Principles
- Domain-driven service boundaries
- Event-first integration with Kafka
- Contract-first APIs with OpenAPI and schema validation
- Stateless compute for horizontal autoscaling
- Zero-trust service-to-service security
- End-to-end observability with traces, metrics, and logs

## Topology
- `gateway/api-gateway` (Fastify): edge routing, auth verification, aggregation, rate limiting
- `services/*` (Node.js + TypeScript + Prisma): transactional business domains
- `services/ai-service` (FastAPI): disease detection, yield and risk predictions
- `services/satellite-service` (FastAPI): NDVI and geospatial analytics using Rasterio/GDAL
- `packages/shared-types`: shared domain/events contracts
- `packages/shared-utils`: Kafka, telemetry, logger, HTTP helpers
- `infra/docker`: local platform bootstrap
- `infra/k8s`: production-grade K8s manifests
- `infra/terraform`: cloud infra provisioning

## Services
- auth-service: JWT, refresh token, RBAC, OTP
- user-service: profile, preferences, user metadata
- farm-service: farms, plots, soil records, irrigation
- crop-service: lifecycle, events, harvest logs
- marketplace-service: listings, bids, contracts
- order-service: orders, deliveries, tracking events
- payment-service: payment intents, capture, refunds, webhooks
- notification-service: email/SMS/WhatsApp/push orchestration
- advisory-service: weather/pest/fertilizer recommendations
- analytics-service: performance and trends projections
- satellite-service: imagery ingestion, NDVI and health scoring
- ai-service: disease detection, yield, optimization, climate risk
- admin-service: moderation, audits, policy controls

## Event Streams (Kafka)
Primary topics:
- `farm.events`
- `crop.events`
- `marketplace.events`
- `order.events`
- `payment.events`
- `advisory.events`
- `ai.events`
- `notification.events`
- `admin.events`

Canonical event names:
- `FarmCreated`
- `CropEventLogged`
- `CropListed`
- `OrderPlaced`
- `YieldPredicted`
- `DiseaseDetected`

## Data Stack
- PostgreSQL for OLTP
- PostGIS extension for geospatial farm boundaries
- Redis for session/cache/rate-limit
- Elasticsearch for search across marketplace and advisory
- S3/MinIO for imagery and file blobs

## Observability
- OpenTelemetry SDK in every service
- Prometheus metrics endpoint `/metrics`
- Grafana dashboards for latency/errors/queue lag
- Structured logs with trace and correlation IDs

## Security
- JWT short-lived access tokens + rotating refresh tokens
- RBAC and resource-level authorization
- Schema validation at edge and service boundaries
- Audit log events for privileged actions
- Rate limiting and WAF at gateway ingress

## Deployment Model
- Dockerized services
- Kubernetes (Ingress + HPA + ConfigMap/Secret + PodDisruptionBudget)
- Terraform for network, DB, Redis, Kafka, buckets, IAM
- GitHub Actions CI/CD with quality gates and progressive rollout
