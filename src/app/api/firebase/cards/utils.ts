import { Card } from "../../../../../frontend/types/cardTypes";
import { useFirebaseAPI } from "../../../../../lib/useFireBaseAPI";

export interface FirebaseCardDocument extends Omit<Card, "id"> {
  createdAt: string;
  perm: {
    read: [];
    write: [];
    delete: [];
  };
  timestamp: string;
}

export function inputCardFactory(card: Card): FirebaseCardDocument {
  return {
    title: card.title,
    description: card.description,
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    perm: {
      read: [],
      write: [],
      delete: [],
    },
    timestamp: new Date().toISOString(),
  };
}

export function outputCardFactory(card: Card): Card {
  return {
    id: card.id,
    title: card.title,
    description: card.description,
    date: card.date?.toString() || "",
  };
}

export const cardsAPI = useFirebaseAPI<FirebaseCardDocument>("cards");
