import express from 'express';

const app = express();

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

app.get('/api/market', (req, res) => {
  res.json({ message: 'Welcome to the Market Service!' });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Market Service is running on port ${PORT}`);
});
