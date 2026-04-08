import 'dotenv/config';
import { SignOptions } from 'jsonwebtoken';

export const env = {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    dataBaseUrl: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '24h') as SignOptions['expiresIn'],
}

if (!env.dataBaseUrl) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

if (!env.jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

if(isNaN(env.port) || env.port < 1 || env.port > 65535) {
    throw new Error('Invalid PORT value. Please provide a valid port number between 1 and 65535.');
}