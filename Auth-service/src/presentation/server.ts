import express, { Express } from 'express';
import { authRoutes } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { env } from '../infrastructure/config/env.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Express = express();
app.use(cors({
    origin: env.frontendUrl,
    credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).send('OK'));
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