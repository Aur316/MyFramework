import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async (): Promise<void> => {
  if (cached.conn) return;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("Connected to MongoDB");
};
