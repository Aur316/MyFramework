import mongoose from "mongoose";

export interface Card {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface CardDocument extends Omit<Card, "id"> {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  perm: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
  timestamp: number;
}
