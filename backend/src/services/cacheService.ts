import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const TTL:number=Number(process.env.REDIS_TTL)
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  retryStrategy(times) {
    if (times > 5) {
      // Stop trying after 5 attempts
      return null;
    }
    // reconnect after
    return Math.min(times * 50, 2000); // ms
  },
});

// Prevent unhandled error events crashing your app
redis.on('error', (err) => {
  console.warn('Redis error:', err.message); // we can log this on server for tracking
});

export async function getFromCache(key: string): Promise<string | null> {
  try {
    // Redis get command with timeout fallback
    const result = await Promise.race([
      redis.get(key),
      new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 200)),
    ]);
    return result;
  } catch (error) {
    console.warn('Redis GET failed:', error);
    return null; // fallback to null on error
  }
}

export async function saveToCache(key: string, value: string): Promise<void> {
  try {
    await redis.set(key, value, 'EX', 3600); // expire in 1 hour
  } catch (error) {
    console.warn('Redis SET failed:', error);
    // silently ignore
  }
}