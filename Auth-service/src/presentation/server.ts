import express, { Express } from 'express';
import { authRoutes } from './routes';
import { errorHandler } from './middlewares';
import { env } from '../infrastructure/config/env';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', (req, res) => res.status(200).send('OK'));
app.use('/auth', authRoutes);
app.use(errorHandler);

const PORT = env.port;

app.listen(PORT, () => {
    console.log(`Auth-service API Server is running on port ${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

export default app;