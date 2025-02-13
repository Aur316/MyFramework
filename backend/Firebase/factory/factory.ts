import { Card, FirebaseCardDocument } from "../model/cardModel";

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

export function outputCardFactory(card: any): Card {
  return {
    id: card.id,
    title: card.title,
    description: card.description,
    date: card.date?.toString() || "",
  };
}
