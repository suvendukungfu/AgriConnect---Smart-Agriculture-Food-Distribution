# AgriConnect Microservices

This directory contains independently deployable domain services.

- Node.js + TypeScript services: auth, user, farm, crop, marketplace, order, payment, notification, advisory, analytics, admin.
- Python FastAPI services: ai-service, satellite-service.

Each service includes:
- Fast startup server
- Health endpoint
- Domain route skeleton
- Kafka integration stub
- Prisma schema (Node services)
- Dockerfile
