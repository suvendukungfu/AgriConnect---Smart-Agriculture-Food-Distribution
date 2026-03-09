# AgriConnect Server API

## Auth Endpoints

- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/verify-otp`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

## Payments Endpoints

- `GET /api/payments/methods`
- `POST /api/payments/intents`
- `GET /api/payments`
- `GET /api/payments/:paymentId`
- `POST /api/payments/:paymentId/capture`
- `POST /api/payments/:paymentId/fail`
- `POST /api/payments/:paymentId/refund`
- `POST /api/payments/webhooks/provider`

## Example: Create Payment Intent

```bash
curl -X POST http://localhost:8000/api/payments/intents \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-1001",
    "customerId": "CUST-1",
    "customer": {
      "name": "Suvendu Sahoo",
      "email": "suvendusahoo@example.com"
    },
    "amount": 1999,
    "currency": "INR",
    "method": "upi"
  }'
```

## Optional Webhook Security

Set `PAYMENT_WEBHOOK_SECRET` in `server/.env` to verify provider webhook signatures.
