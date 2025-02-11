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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable");
}
let cached = global.mongoose || { conn: null, promise: null };
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cached.conn)
        return;
    if (!cached.promise) {
        cached.promise = mongoose_1.default
            .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then((mongoose) => mongoose);
    }
    cached.conn = yield cached.promise;
    console.log("Connected to MongoDB");
});
exports.connectToDatabase = connectToDatabase;
