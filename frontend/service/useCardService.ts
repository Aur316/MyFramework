import { useCardRepository } from "../repository/useCardRepository";
import { useCardStore } from "../store/useCardContext";
import { Card, UseCardService } from "../types/cardTypes";

export function useCardService(): UseCardService {
  const { fetchCards, addCard, updateCard, deleteCard } = useCardRepository();
  const { cards, setCards } = useCardStore();

  const loadCards = async (): Promise<void> => {
    const fetchedCards = await fetchCards();
    setCards(fetchedCards);
  };

  const createCard = async (card: Card): Promise<void> => {
    console.log(card, "card service");
    const newCard = await addCard(card);
    console.log(newCard, "newCard service");
    setCards([...cards, newCard]);
  };

  const updateExistingCard = async (card: Card): Promise<void> => {
    const updated = await updateCard(card);
    setCards(cards.map((c) => (c.id === card.id ? updated : c)));
  };

  const removeCard = async (id: string): Promise<void> => {
    await deleteCard(id);
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
