import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export const setCache = (topic: string, key: string, value: string) => {
  return redis.set(`${topic}-${key}`, value);
};

export const getCache = (topic: string, key: string) => {
  return redis.get(`${topic}-${key}`);
};
