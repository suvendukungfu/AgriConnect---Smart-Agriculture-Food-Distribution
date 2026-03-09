const express = require('express');
const { healthCheck } = require('../controllers/healthController');
const authRouter = require('./auth');
const paymentRouter = require('./payments');

const router = express.Router();

router.get('/health', healthCheck);
router.use('/auth', authRouter);
router.use('/payments', paymentRouter);

module.exports = router;
