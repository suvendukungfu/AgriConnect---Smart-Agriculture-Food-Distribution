const express = require('express');
const {
  createPaymentIntent,
  getPaymentById,
  listAllPayments,
  markPaymentCaptured,
  markPaymentFailed,
  createRefund,
  handleProviderWebhook,
  getPaymentMethods,
} = require('../controllers/paymentController');

const router = express.Router();

router.get('/methods', getPaymentMethods);
router.post('/intents', createPaymentIntent);
router.get('/', listAllPayments);
router.post('/webhooks/provider', handleProviderWebhook);
router.get('/:paymentId', getPaymentById);
router.post('/:paymentId/capture', markPaymentCaptured);
router.post('/:paymentId/fail', markPaymentFailed);
router.post('/:paymentId/refund', createRefund);

module.exports = router;
