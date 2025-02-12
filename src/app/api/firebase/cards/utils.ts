import { useFirebaseAPI } from "../../../../../lib/useFireBaseAPI";

export interface Card {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface FirebaseCardDocument extends Omit<Card, "id"> {
  id: string;
  createdAt: Date;
  perm: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
  timestamp: number;
}

export function inputCardFactory(card: Card): FirebaseCardDocument {
  return {
    id: card.id || "",
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
    id: card.id,
    title: card.title,
    description: card.description,
    date: card.date?.toString() || "",
  };
}

export const cardsAPI = useFirebaseAPI<FirebaseCardDocument>("cards");
