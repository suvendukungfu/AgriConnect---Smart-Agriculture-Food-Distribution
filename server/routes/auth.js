const express = require('express');
const {
  login,
  signup,
  verifyOtp,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
