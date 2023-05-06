import express from 'express';
import cors from 'cors';
import router from './src/routes/index.js';

const app = express();

app.use((req, res, next) => {
  if (!req.headers['content-type']) {
    req.headers['content-type'] = 'application/json';
  }
  next();
});

app.use(cors());
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'An internal server error occurred' });
});

export default app;
