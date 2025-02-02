import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST ?? '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  }
});

redisClient.on('error', (err) => console.error('❌ Redis Error:', err));

(async () => {
  await redisClient.connect();
  console.log('✅ Redis Connected!');
})();

class RedisCacheService {
  async set<T>(key: string, value: T, ttl: number = 300): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await redisClient.set(key, jsonValue, { EX: ttl });
  }

  async get<T>(key: string): Promise<T | null> {
    const result = await redisClient.get(key);
    return result ? JSON.parse(result) : null;
  }

  async delete(key: string): Promise<void> {
    await redisClient.del(key);
  }

  async clear(): Promise<void> {
    await redisClient.flushAll();
  }
}

export default new RedisCacheService();
