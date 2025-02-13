import Redis from "ioredis";

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisClient.on("connect", () => console.log("Redis connected!"));
redisClient.on("error", (err) => console.error("Redis error:", err));
