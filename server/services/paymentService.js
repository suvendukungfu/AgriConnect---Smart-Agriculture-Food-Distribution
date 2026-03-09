const crypto = require('crypto');
const { AppError } = require('../utils/appError');

const paymentStore = new Map();

const PAYMENT_METHODS = [
  {
    code: 'upi',
    label: 'UPI',
    provider: 'simulated_gateway',
    enabled: true,
  },
  {
    code: 'card',
    label: 'Credit / Debit Card',
    provider: 'simulated_gateway',
    enabled: true,
  },
  {
    code: 'netbanking',
    label: 'Net Banking',
    provider: 'simulated_gateway',
    enabled: true,
  },
  {
    code: 'wallet',
    label: 'Wallet',
    provider: 'simulated_gateway',
    enabled: true,
  },
  {
    code: 'cod',
    label: 'Cash on Delivery',
    provider: 'offline',
    enabled: true,
  },
];

const SUPPORTED_STATUSES = [
  'created',
  'pending',
  'captured',
  'failed',
  'refunded',
];

const createPaymentId = () => {
  const raw = crypto.randomUUID().replace(/-/g, '').slice(0, 18);
  return `pay_${raw}`;
};

const createEvent = (type, metadata) => ({
  type,
  at: new Date().toISOString(),
  metadata: metadata || null,
});

const assertPaymentExists = (paymentId) => {
  const payment = paymentStore.get(paymentId);
  if (!payment) {
    throw new AppError(404, `Payment ${paymentId} not found`);
  }
  return payment;
};

const ensureTransition = (currentStatus, nextStatus) => {
  const transitions = {
    created: ['pending', 'captured', 'failed'],
    pending: ['captured', 'failed'],
    captured: ['refunded'],
    failed: [],
    refunded: [],
  };

  const allowed = transitions[currentStatus] || [];
  if (!allowed.includes(nextStatus)) {
    throw new AppError(
      409,
      `Cannot transition payment from ${currentStatus} to ${nextStatus}`
    );
  }
};

const listPaymentMethods = () => PAYMENT_METHODS.filter((method) => method.enabled);

const createIntent = ({
  orderId,
  customerId,
  customer,
  amount,
  currency,
  method,
  notes,
  metadata,
}) => {
  const selectedMethod = PAYMENT_METHODS.find((item) => item.code === method && item.enabled);
  if (!selectedMethod) {
    throw new AppError(400, `Unsupported payment method: ${method}`);
  }

  const paymentId = createPaymentId();
  const nowIso = new Date().toISOString();

  const payment = {
    paymentId,
    orderId,
    customerId,
    customer,
    amount,
    currency,
    method,
    provider: selectedMethod.provider,
    status: method === 'cod' ? 'pending' : 'created',
    providerReference: null,
    notes: notes || null,
    metadata: metadata || null,
    checkoutUrl:
      method === 'cod' ? null : `https://pay.agriconnect.local/checkout/${paymentId}`,
    createdAt: nowIso,
    updatedAt: nowIso,
    events: [createEvent('intent.created', { method, amount, currency })],
  };

  paymentStore.set(paymentId, payment);
  return payment;
};

const getById = (paymentId) => assertPaymentExists(paymentId);

const listPayments = ({ orderId, customerId, status } = {}) => {
  return Array.from(paymentStore.values()).filter((payment) => {
    const orderMatch = orderId ? payment.orderId === orderId : true;
    const customerMatch = customerId ? payment.customerId === customerId : true;
    const statusMatch = status ? payment.status === status : true;
    return orderMatch && customerMatch && statusMatch;
  });
};

const updateStatus = (paymentId, nextStatus, eventType, eventMetadata) => {
  if (!SUPPORTED_STATUSES.includes(nextStatus)) {
    throw new AppError(400, `Unsupported payment status: ${nextStatus}`);
  }

  const payment = assertPaymentExists(paymentId);
  ensureTransition(payment.status, nextStatus);

  const updated = {
    ...payment,
    status: nextStatus,
    updatedAt: new Date().toISOString(),
    events: [...payment.events, createEvent(eventType, eventMetadata)],
  };

  paymentStore.set(paymentId, updated);
  return updated;
};

const capturePayment = (paymentId, providerReference) =>
  updateStatus(paymentId, 'captured', 'payment.captured', {
    providerReference: providerReference || null,
  });

const failPayment = (paymentId, reason) =>
  updateStatus(paymentId, 'failed', 'payment.failed', {
    reason: reason || null,
  });

const refundPayment = (paymentId, reason) =>
  updateStatus(paymentId, 'refunded', 'payment.refunded', {
    reason: reason || null,
  });

module.exports = {
  createIntent,
  getById,
  listPayments,
  capturePayment,
  failPayment,
  refundPayment,
  listPaymentMethods,
};
