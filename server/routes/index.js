const express = require('express');
const { healthCheck } = require('../controllers/healthController');
const authRouter = require('./auth');

const router = express.Router();

router.get('/health', healthCheck);
router.use('/auth', authRouter);

module.exports = router;
