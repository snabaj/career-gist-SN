import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST ?? "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD ?? "", // Set this in .env if using a secured Redis
  tls: process.env.REDIS_TLS ? {} : undefined as any, // Enables TLS if specified
});

redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));

/**
 * Set data in Redis cache with expiration
 * @param {string} key - Cache key
 * @param {any} value - Data to store
 * @param {number} ttl - Time-to-live in seconds (default: 3600s = 1 hour)
 */
export const setCache = async (key: string, value: any, ttl: number = 7200) => { // 2 hours of storage
  try {
    const serializedValue = JSON.stringify(value);
    await redisClient.setex(key, ttl, serializedValue);
    console.log(`✅ Cached: ${key} (TTL: ${ttl}s)`);
  } catch (error) {
    console.error("❌ Error setting cache:", error);
  }
};

/**
 * Get data from Redis cache
 * @param {string} key - Cache key
 * @returns {Promise<any | null>} - Cached data or null if not found
 */
export const getCache = async (key: string): Promise<any | null> => {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error("❌ Error getting cache:", error);
    return null;
  }
};

/**
 * Delete a specific key from Redis cache
 * @param {string} key - Cache key to delete
 */
export const deleteCache = async (key: string) => {
  try {
    await redisClient.del(key);
    console.log(`🗑️ Cache deleted: ${key}`);
  } catch (error) {
    console.error("❌ Error deleting cache:", error);
  }
};

/**
 * Clear all cache (WARNING: This removes all Redis keys!)
 */
export const clearCache = async () => {
  try {
    await redisClient.flushall();
    console.log("🧹 Redis cache cleared!");
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
  }
};
