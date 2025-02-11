import { useCallback } from "react";
import { Card, UseCardRepository } from "../types/cardTypes";
import useHttp from "../hook/useHttp";

export function useCardRepository(): UseCardRepository {
  const { httpGet, httpPost, httpPut, httpDelete } = useHttp();

  const fetchCards = useCallback(async (): Promise<Card[]> => {
    return await httpGet<Card[]>("/cards");
  }, [httpGet]);

  const addCard = useCallback(
    async (card: Card): Promise<Card> => {
      return await httpPost<Card>("/cards", card);
    },
    [httpPost]
  );

  const updateCard = useCallback(
    async (card: Card): Promise<Card> => {
      return await httpPut<Card>(`/cards/${card.id}`, card);
    },
    [httpPut]
  );

  const deleteCard = useCallback(
    async (id: string): Promise<void> => {
      await httpDelete(`/cards/${id}`);
    },
    [httpDelete]
  );

  return { fetchCards, addCard, updateCard, deleteCard };
}
