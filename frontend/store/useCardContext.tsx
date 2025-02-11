"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Card, CardContextType } from "../types/cardTypes";

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);

  return (
    <CardContext.Provider value={{ cards, setCards }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCardStore() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardStore must be used within a CardProvider");
  }
  return context;
}
