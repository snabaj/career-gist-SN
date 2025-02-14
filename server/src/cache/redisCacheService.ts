import Redis from "ioredis";
import dotenv from "dotenv";
import {createClient} from "redis";

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST ?? '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD ?? '',
  tls: process.env.REDIS_TLS ? {} : undefined as any,
});

redis.on("error", (err : Error) : void => console.error("❌ Redis error:", err));
redis.on("end", () : void => console.warn("⚠️ Redis connection closed"));


export const setCache : (key : string, value : unknown, ttl?: number) => Promise<void> = async (key: string, value: unknown, ttl: number = 900) : Promise<void> => {
  try {
    const data = {
      timestamp: Date.now(),
      value
    };
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error("❌ Error setting cache:", error);
  }
};

export const getCache : (key : string) => Promise<string | null> = async (key: string): Promise<string | null> => {
  try {
    const cachedData : string | null = await redisClient.get(key);
    if (!cachedData) return null;

    const parsedData = JSON.parse(cachedData);
    return parsedData.value;
  } catch (error) {
    console.error("❌ Redis is down! Falling back to PostgreSQL.");
    return null;
  }
};

export const deleteCache : (key : string) => Promise<void> = async (key: string) : Promise<void> => {
  try {
    await redisClient.del(key);
    console.log(`🗑️ Cache deleted: ${key}`);
  } catch (error) {
    console.error("❌ Error deleting cache:", error);
  }
};

export const clearCache : () => Promise<void> = async () : Promise<void> => {
  try {
    await redis.flushall();
    console.log("✅ Redis cache cleared!");
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
  }
};

export const redisClient = createClient({
  username: process.env.REDIS_USERNAME ?? 'default',
  password: process.env.REDIS_PASSWORD ?? '',
  socket: {
    host: process.env.REDIS_HOST ?? '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

redisClient.on("error", (err) => console.error("❌ Redis error:", err));

(async () : Promise<void> => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
})();

export const cacheEnhancedJobData = async (query: string, data: any) => {
  try {
    await redisClient.set(`job-enhanced:${query}`, JSON.stringify(data), { EX: 900 });
  } catch (error) {
    console.error("❌ Error caching enhanced job data:", error);
  }
};