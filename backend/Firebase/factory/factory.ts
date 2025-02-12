import { Card, FirebaseCardDocument } from "../model/cardModel";

export function inputCardFactory(card: Card): FirebaseCardDocument {
  return {
    ...card,
    id: card.id,
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
    id: card.id,
    title: card.title,
    description: card.description,
    date: card.date?.toString() || "",
  };
}
