import { toast } from "sonner";
import { useCardRepository } from "../repository/useCardRepository";
import { useCardStore } from "../store/useCardContext";
import { Card, UseCardService } from "../types/cardTypes";
import { useTranslation } from "react-i18next";

export function useCardService(): UseCardService {
  const { fetchCards, addCard, updateCard, deleteCard } = useCardRepository();
  const { t } = useTranslation();

  const {
    cards,
    setCards,
    setGetCardLoading,
    setCreateCardLoading,
    setUpdateCardLoading,
    setDeletetCardLoading,
  } = useCardStore();

  const loadCards = async (): Promise<void> => {
    try {
      setGetCardLoading(true);
      const fetchedCards = await fetchCards();
      setCards(fetchedCards);
    } catch (error) {
      console.error("Failed to load cards:", error);
    } finally {
      setGetCardLoading(false);
    }
  };

  const createCard = async (card: Card): Promise<void> => {
    try {
      setCreateCardLoading(true);
      const newCard = await addCard(card);
      setCards([...cards, newCard]);
      toast.success(t("createCardSuccess"));
    } catch (error) {
      console.error("Failed to create card:", error);
      toast.error(t("createCardError"));
    } finally {
      setCreateCardLoading(false);
    }
  };

  const updateExistingCard = async (card: Card): Promise<void> => {
    try {
      setUpdateCardLoading(true);
      const updated = await updateCard(card);
      setCards(cards.map((c) => (c.id === card.id ? updated : c)));
      toast.success(t("updateCardSuccess"));
    } catch (error) {
      console.error("Failed to update card:", error);
      toast.error(t("updateCardError"));
    } finally {
      setUpdateCardLoading(false);
    }
  };

  const removeCard = async (id: string): Promise<void> => {
    try {
      setDeletetCardLoading(true);
      await deleteCard(id);
      setCards(cards.filter((c) => c.id !== id));
      toast.success(t("deleteCardSuccess"));
    } catch (error) {
      console.error("Failed to delete card:", error);
      toast.error(t("deleteCardError"));
    } finally {
      setDeletetCardLoading(false);
    }
  };

  return {
    cards,
    createCard,
    updateCard: updateExistingCard,
    removeCard,
    loadCards,
  };
}
