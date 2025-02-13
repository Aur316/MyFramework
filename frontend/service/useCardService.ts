import { useCardRepository } from "../repository/useCardRepository";
import { useCardStore } from "../store/useCardContext";
import { Card, UseCardService } from "../types/cardTypes";

export function useCardService(): UseCardService {
  const { fetchCards, addCard, updateCard, deleteCard } = useCardRepository();
  const {
    cards,
    setCards,
    setGetCardLoading,
    setCreateCardLoading,
    setUpdateCardLoading,
    setDeletetCardLoading,
  } = useCardStore();

  const loadCards = async (): Promise<void> => {
    setGetCardLoading(true);
    const fetchedCards = await fetchCards();
    setGetCardLoading(false);
    setCards(fetchedCards);
  };

  const createCard = async (card: Card): Promise<void> => {
    setCreateCardLoading(true);
    const newCard = await addCard(card);
    setCreateCardLoading(false);
    setCards([...cards, newCard]);
  };

  const updateExistingCard = async (card: Card): Promise<void> => {
    setUpdateCardLoading(true);
    const updated = await updateCard(card);
    setUpdateCardLoading(false);
    setCards(cards.map((c) => (c.id === card.id ? updated : c)));
  };

  const removeCard = async (id: string): Promise<void> => {
    setDeletetCardLoading(true);
    await deleteCard(id);
    setDeletetCardLoading(false);
    setCards(cards.filter((c) => c.id !== id));
  };

  return {
    cards,
    createCard,
    updateCard: updateExistingCard,
    removeCard,
    loadCards,
  };
}
