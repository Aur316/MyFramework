import { useCallback, useMemo } from "react";
import { Card, UseCardRepository } from "../types/cardTypes";
import useHttp from "../hook/useHttp";

export function useCardRepository(): UseCardRepository {
  const { httpGet, httpPost, httpPut, httpDelete } = useHttp();

  const API_BASE_URL = useMemo(() => {
    const isServer = process.env.NEXT_PUBLIC_DATA_SOURCE !== "server";
    let baseUrl = isServer
      ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      : process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

    baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    return isServer ? `${baseUrl}/cards` : `${baseUrl}/api/mongo/cards`;
  }, []);

  const fetchCards = useCallback(async (): Promise<Card[]> => {
    return await httpGet<Card[]>(API_BASE_URL);
  }, [httpGet, API_BASE_URL]);

  const addCard = useCallback(
    async (card: Card): Promise<Card> => {
      return await httpPost<Card>(API_BASE_URL, card);
    },
    [httpPost, API_BASE_URL]
  );

  const updateCard = useCallback(
    async (card: Card): Promise<Card> => {
      return await httpPut<Card>(`${API_BASE_URL}/${card.id}`, card);
    },
    [httpPut, API_BASE_URL]
  );

  const deleteCard = useCallback(
    async (id: string): Promise<void> => {
      await httpDelete(`${API_BASE_URL}/${id}`);
    },
    [httpDelete, API_BASE_URL]
  );

  return { fetchCards, addCard, updateCard, deleteCard };
}
