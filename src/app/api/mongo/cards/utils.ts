import { ObjectId } from "mongodb";
import { useMongoAPI } from "../../../../../lib/useMongoAPI";

export interface Card {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface MongoCardDocument extends Omit<Card, "id"> {
  _id?: ObjectId;
  id: string;
  createdAt: Date;
  perm: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
  timestamp: number;
}

export function inputCardFactory(card: Card): MongoCardDocument {
  const objectId = new ObjectId();

  return {
    _id: objectId,
    id: objectId.toString(),
    title: card.title,
    description: card.description,
    date: card.date,
    createdAt: new Date(),
    perm: {
      read: true,
      write: true,
      delete: true,
    },
    timestamp: Date.now(),
  };
}

export function outputCardFactory(card: any): Card {
  return {
    id: card.id || card._id?.toString() || "",
    title: card.title,
    description: card.description,
    date: card.date?.toString() || "",
  };
}

export const cardsAPI = useMongoAPI<MongoCardDocument>("cards");
