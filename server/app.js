const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { requestLogger } = require('./middlewares/requestLogger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 8000;

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({
    name: 'AgriConnect API',
    status: 'running',
    version: '1.1.0',
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
