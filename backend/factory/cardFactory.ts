import mongoose from "mongoose";
import { Card, CardDocument } from "../model/cardModel";

export function inputCardFactory(card: Card): CardDocument {
  return {
    ...card,
    _id: new mongoose.Types.ObjectId(),
    createdAt: new Date(),
    perm: {
      read: true,
      write: true,
      delete: true,
    },
    timestamp: Date.now(),
  };
}

export function outputCardFactory(card: CardDocument): Card {
  return {
    id: card._id.toString(),
    title: card.title,
    description: card.description,
    date: card.date?.toString() || "",
  };
}
