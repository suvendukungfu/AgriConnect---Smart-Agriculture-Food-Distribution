const crypto = require('crypto');
const { AppError } = require('../utils/appError');
const {
  createIntent,
  getById,
  listPayments,
  capturePayment,
  failPayment,
  refundPayment,
  listPaymentMethods,
} = require('../services/paymentService');

const SUPPORTED_CURRENCIES = ['INR'];

const requireNonEmptyString = (value, fieldName) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    throw new AppError(400, `${fieldName} is required`);
  }
};

const requirePositiveAmount = (amount) => {
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
    throw new AppError(400, 'amount must be a positive number');
  }
};

const createPaymentIntent = (req, res, next) => {
  try {
    const {
      orderId,
      customerId,
      customer,
      amount,
      currency = 'INR',
      method,
      notes,
      metadata,
    } = req.body;

    requireNonEmptyString(orderId, 'orderId');
    requireNonEmptyString(customerId, 'customerId');
    requirePositiveAmount(amount);
    requireNonEmptyString(method, 'method');

    if (!SUPPORTED_CURRENCIES.includes(currency)) {
      throw new AppError(400, `Unsupported currency: ${currency}`);
    }

    if (!customer || typeof customer !== 'object') {
      throw new AppError(400, 'customer is required');
    }

    requireNonEmptyString(customer.name, 'customer.name');
    requireNonEmptyString(customer.email, 'customer.email');

    const payment = createIntent({
      orderId,
      customerId,
      customer,
      amount,
      currency,
      method,
      notes,
      metadata,
    });

    res.status(201).json({
      success: true,
      message: 'Payment intent created',
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentById = (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = getById(paymentId);
    res.json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

const listAllPayments = (req, res, next) => {
  try {
    const { orderId, customerId, status } = req.query;
    const payments = listPayments({ orderId, customerId, status });
    res.json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

const markPaymentCaptured = (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const { providerReference } = req.body;
    const payment = capturePayment(paymentId, providerReference);
    res.json({
      success: true,
      message: 'Payment captured successfully',
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const markPaymentFailed = (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const { reason } = req.body;
    const payment = failPayment(paymentId, reason);
    res.json({
      success: true,
      message: 'Payment marked as failed',
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const createRefund = (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const { reason } = req.body;
    const payment = refundPayment(paymentId, reason);
    res.json({
      success: true,
      message: 'Payment refunded successfully',
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const handleProviderWebhook = (req, res, next) => {
  try {
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET;
    const signature = req.headers['x-payment-signature'];

    if (webhookSecret) {
      if (!signature) {
        throw new AppError(401, 'Missing webhook signature');
      }

      const expected = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (expected !== signature) {
        throw new AppError(401, 'Invalid webhook signature');
      }
    }

    const { paymentId, status, providerReference, reason } = req.body;
    requireNonEmptyString(paymentId, 'paymentId');
    requireNonEmptyString(status, 'status');

    let payment;
    if (status === 'captured') {
      payment = capturePayment(paymentId, providerReference);
    } else if (status === 'failed') {
      payment = failPayment(paymentId, reason);
    } else if (status === 'refunded') {
      payment = refundPayment(paymentId, reason);
    } else {
      throw new AppError(400, `Unsupported webhook status: ${status}`);
    }

    res.json({
      success: true,
      message: 'Webhook processed',
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentMethods = (req, res) => {
  res.json({
    success: true,
    data: listPaymentMethods(),
  });
};

module.exports = {
  createPaymentIntent,
  getPaymentById,
  listAllPayments,
  markPaymentCaptured,
  markPaymentFailed,
  createRefund,
  handleProviderWebhook,
  getPaymentMethods,
};
