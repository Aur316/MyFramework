import Redis from "ioredis";

console.log("REDIS_HOST:", process.env.REDIS_HOST);
console.log("REDIS_PORT:", process.env.REDIS_PORT);
console.log("REDIS_PASSWORD:", process.env.REDIS_PASSWORD);

const redisPort = Number(process.env.REDIS_PORT);
if (isNaN(redisPort)) {
  throw new Error("REDIS_PORT is not a valid number. Check your .env file.");
}

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: redisPort,
  password: process.env.REDIS_PASSWORD,
  tls: {},
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisClient.on("connect", () => console.log("Redis connected!"));
redisClient.on("error", (err) => console.error("Redis error:", err));

export const redisCrud = {
  async addRedis<T>(
    key: string,
    value: T,
    ttlSeconds: number = 300
  ): Promise<void> {
    await redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
  },

  async getRedis<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  },

  async updateRedis<T>(
    key: string,
    value: T,
    ttlSeconds: number = 300
  ): Promise<void> {
    await redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
  },

  async deleteRedis(key: string): Promise<void> {
    await redisClient.del(key);
  },
};
