import mongoose from "mongoose";

export function useMongoAPI<T>(collectionName: string) {
  const model = mongoose.model<T>(
    collectionName,
    new mongoose.Schema({}, { strict: false })
  );

  const findAll = async (): Promise<T[]> => {
    return await model.find();
  };

  const findById = async (id: string): Promise<T | null> => {
    return await model.findById(id);
  };

  const insertOne = async (data: T): Promise<T> => {
    return await model.create(data);
  };

  const updateOne = async (id: string, data: Partial<T>): Promise<T | null> => {
    return await model.findByIdAndUpdate(id, data, { new: true });
  };

  const deleteOne = async (id: string): Promise<void> => {
    await model.findByIdAndDelete(id);
  };

  return { findAll, findById, insertOne, updateOne, deleteOne };
}
