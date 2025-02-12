import mongoose from "mongoose";
import { dbConnect } from "./mongoDBConnect";

export function useMongoAPI<T>(collectionName: string) {
  const connectDB = async () => {
    await dbConnect();
  };

  const model =
    mongoose.models[collectionName] ||
    mongoose.model<T>(
      collectionName,
      new mongoose.Schema({}, { strict: false })
    );

  const findAll = async (): Promise<T[]> => {
    await connectDB();
    return await model.find();
  };

  const findById = async (id: string): Promise<T | null> => {
    await connectDB();
    return await model.findById(id);
  };

  const insertOne = async (data: T): Promise<T> => {
    await connectDB();
    return await model.create(data);
  };

  const updateOne = async (id: string, data: Partial<T>): Promise<T | null> => {
    await connectDB();
    return await model.findByIdAndUpdate(id, data, { new: true });
  };

  const deleteOne = async (id: string): Promise<void> => {
    await connectDB();
    await model.findByIdAndDelete(id);
  };

  return { findAll, findById, insertOne, updateOne, deleteOne };
}
