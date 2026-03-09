const healthCheck = (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'agriconnect-server',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    message: 'AgriConnect API health is good'
  });
};

module.exports = { healthCheck };
