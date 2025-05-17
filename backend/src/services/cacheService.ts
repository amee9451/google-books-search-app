import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const TTL:number=Number(process.env.REDIS_TTL)
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
});

export const getFromCache = async (key: string):Promise<string|null> => {
  return await redis.get(key);
};

export const saveToCache = async (key: string, value: string, ttl = TTL):Promise<void> => {
  await redis.set(key, value, 'EX', ttl);
};