"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisCrud = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
console.log("✅ REDIS_HOST:", process.env.REDIS_HOST);
console.log("✅ REDIS_PORT:", process.env.REDIS_PORT);
console.log("✅ REDIS_PASSWORD:", process.env.REDIS_PASSWORD ? "**** (hidden)" : "Not Set");
const redisPort = Number(process.env.REDIS_PORT);
if (isNaN(redisPort)) {
    throw new Error("❌ REDIS_PORT is not a valid number. Check your .env file.");
}
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: redisPort,
    password: process.env.REDIS_PASSWORD,
    tls: {}, // Ha szükséges a felhős Redisnél
    retryStrategy: (times) => Math.min(times * 50, 2000),
});
redisClient.on("connect", () => console.log("✅ Redis connected!"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));
exports.redisCrud = {
    addRedis(key_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (key, value, ttlSeconds = 300) {
            yield redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
        });
    },
    getRedis(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield redisClient.get(key);
            return data ? JSON.parse(data) : null;
        });
    },
    updateRedis(key_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (key, value, ttlSeconds = 300) {
            yield redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
        });
    },
    deleteRedis(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redisClient.del(key);
        });
    },
};
