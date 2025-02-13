"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Card, CardContextType } from "../types/cardTypes";

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [getCardLoading, setGetCardLoading] = useState<boolean>(false);
  const [updateCardLoading, setUpdateCardLoading] = useState<boolean>(false);
  const [createCardLoading, setCreateCardLoading] = useState<boolean>(false);
  const [deleteCardLoading, setDeletetCardLoading] = useState<boolean>(false);
  const [sureForDelete, setSureForDelete] = useState<boolean>(false);

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
        getCardLoading,
        setGetCardLoading,
        updateCardLoading,
        setUpdateCardLoading,
        deleteCardLoading,
        setDeletetCardLoading,
        createCardLoading,
        setCreateCardLoading,
        sureForDelete,
        setSureForDelete,
      }}
    >
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
