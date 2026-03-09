const crypto = require('crypto');
const { AppError } = require('../utils/appError');

const SESSION_TTL_MS = 60 * 60 * 1000;
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const RESET_TTL_MS = 15 * 60 * 1000;

const usersByEmail = new Map();
const refreshTokenStore = new Map();
const passwordResetStore = new Map();

const seedUser = {
  id: '1',
  name: 'Suvendu Sahoo',
  email: 'suvendusahoo@example.com',
  password: 'Suvendu@123',
  role: 'farmer',
  permissions: ['crop:read', 'crop:write', 'payment:read', 'payment:write'],
  region: 'Odisha',
};

usersByEmail.set(seedUser.email, seedUser);

const randomToken = (prefix) =>
  `${prefix}_${crypto.randomUUID().replace(/-/g, '')}${Date.now()}`;

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  permissions: user.permissions || [],
  region: user.region || null,
});

const createSession = (user) => {
  const accessToken = randomToken('acc');
  const refreshToken = randomToken('ref');
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  refreshTokenStore.set(refreshToken, {
    userId: user.id,
    email: user.email,
    expiresAt: now + REFRESH_TTL_MS,
  });

  return {
    accessToken,
    refreshToken,
    expiresAt,
    user: sanitizeUser(user),
  };
};

const assertRequired = (value, fieldName) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    throw new AppError(400, `${fieldName} is required`);
  }
};

const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    assertRequired(email, 'email');
    assertRequired(password, 'password');

    const user = usersByEmail.get(email);
    if (!user || user.password !== password) {
      throw new AppError(401, 'Invalid credentials');
    }

    res.json(createSession(user));
  } catch (error) {
    next(error);
  }
};

const signup = (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    assertRequired(name, 'name');
    assertRequired(email, 'email');
    assertRequired(password, 'password');

    if (usersByEmail.has(email)) {
      throw new AppError(409, 'User already exists');
    }

    const created = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role: role || 'farmer',
      permissions: ['crop:read', 'crop:write', 'payment:read', 'payment:write'],
      region: null,
    };

    usersByEmail.set(email, created);
    res.status(201).json(createSession(created));
  } catch (error) {
    next(error);
  }
};

const verifyOtp = (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    assertRequired(phone, 'phone');
    assertRequired(otp, 'otp');

    const user = usersByEmail.get(seedUser.email);
    res.json(createSession(user));
  } catch (error) {
    next(error);
  }
};

const refresh = (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    assertRequired(refreshToken, 'refreshToken');

    const tokenRecord = refreshTokenStore.get(refreshToken);
    if (!tokenRecord || tokenRecord.expiresAt < Date.now()) {
      refreshTokenStore.delete(refreshToken);
      throw new AppError(401, 'Refresh token is invalid or expired');
    }

    const user = usersByEmail.get(tokenRecord.email);
    if (!user) {
      throw new AppError(401, 'User not found for refresh token');
    }

    const accessToken = randomToken('acc');
    const expiresAt = Date.now() + SESSION_TTL_MS;

    res.json({ accessToken, expiresAt });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken && typeof refreshToken === 'string') {
      refreshTokenStore.delete(refreshToken);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = (req, res, next) => {
  try {
    const { email } = req.body;
    assertRequired(email, 'email');

    const user = usersByEmail.get(email);
    if (user) {
      const token = randomToken('pwdreset');
      passwordResetStore.set(token, {
        email,
        expiresAt: Date.now() + RESET_TTL_MS,
      });
    }

    res.json({
      message: 'If the account exists, a password reset link has been generated',
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = (req, res, next) => {
  try {
    const { token, password } = req.body;
    assertRequired(token, 'token');
    assertRequired(password, 'password');

    const record = passwordResetStore.get(token);
    if (!record || record.expiresAt < Date.now()) {
      passwordResetStore.delete(token);
      throw new AppError(400, 'Password reset token is invalid or expired');
    }

    const user = usersByEmail.get(record.email);
    if (!user) {
      throw new AppError(404, 'User not found');
    }

    user.password = password;
    usersByEmail.set(user.email, user);
    passwordResetStore.delete(token);

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signup,
  verifyOtp,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
};
