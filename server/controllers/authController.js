const login = (req, res) => {
  const { email, password } = req.body;
  if (email === 'suvendusahoo@example.com' && password === 'Suvendu@123') {
    res.json({
      accessToken: 'dummy-access-token',
      refreshToken: 'dummy-refresh-token',
      expiresAt: Date.now() + 3600 * 1000,
      user: {
        id: '1',
        name: 'Suvendu Sahoo',
        email: 'suvendusahoo@example.com',
        role: 'farmer'
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const verifyOtp = (req, res) => {
  res.json({ message: 'OTP verified success' });
};

module.exports = { login, verifyOtp };
