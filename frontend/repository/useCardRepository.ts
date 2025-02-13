import { useCallback } from "react";
import { Card, UseCardRepository } from "../types/cardTypes";
import useHttp from "../hook/useHttp";
import { useApiBaseUrl } from "../config/apiConfig";

export function useCardRepository(): UseCardRepository {
  const { httpGet, httpPost, httpPut, httpDelete } = useHttp();
  const API_BASE_URL = useApiBaseUrl();
  const fetchCards = useCallback(async (): Promise<Card[]> => {
    return await httpGet<Card[]>(`${API_BASE_URL}/cards`);
  }, [httpGet, API_BASE_URL]);

  const addCard = useCallback(
    async (card: Card): Promise<Card> => {
      return await httpPost<Card>(`${API_BASE_URL}/cards`, card);
    },
    [httpPost, API_BASE_URL]
  );

  const updateCard = useCallback(
    async (card: Card): Promise<Card> => {
      return await httpPut<Card>(`${API_BASE_URL}/cards/${card.id}`, card);
    },
    [httpPut, API_BASE_URL]
  );

  const deleteCard = useCallback(
    async (id: string): Promise<void> => {
      await httpDelete(`${API_BASE_URL}/cards/${id}`);
    },
    [httpDelete, API_BASE_URL]
  );

  return { fetchCards, addCard, updateCard, deleteCard };
}
