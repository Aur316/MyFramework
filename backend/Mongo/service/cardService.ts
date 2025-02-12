import { inputCardFactory, outputCardFactory } from "../../factory/cardFactory";
import { Card, CardDocument } from "../../model/cardModel";
import { cardRepository } from "../repository/cardRepository";

export const cardService = {
  getAllCards: async (): Promise<Card[]> => {
    try {
      const docs = await cardRepository.getAllCards();
      return docs.map(outputCardFactory);
    } catch (error) {
      console.error("Service Error: Failed to retrieve all cards.", error);
      throw new Error("Service Error: Unable to fetch cards.");
    }
  },

  getCardById: async (id: string): Promise<Card | null> => {
    try {
      const cardDoc: CardDocument | null = await cardRepository.getCardById(id);
      return cardDoc ? outputCardFactory(cardDoc) : null;
    } catch (error) {
      console.error(
        `Service Error: Failed to retrieve card with ID ${id}.`,
        error
      );
      throw new Error("Service Error: Unable to fetch the requested card.");
    }
  },

  createCard: async (card: Card): Promise<Card> => {
    try {
      const newCard: CardDocument = inputCardFactory(card);
      const savedCard: CardDocument = await cardRepository.createCard(newCard);
      return outputCardFactory(savedCard);
    } catch (error) {
      console.error("Service Error: Failed to create a new card.", error);
      throw new Error("Service Error: Unable to create the card.");
    }
  },

  updateCard: async (id: string, card: Partial<Card>): Promise<Card | null> => {
    try {
      const updatedCard: CardDocument | null = await cardRepository.updateCard(
        id,
        card
      );
      return updatedCard ? outputCardFactory(updatedCard) : null;
    } catch (error) {
      console.error(
        `Service Error: Failed to update card with ID ${id}.`,
        error
      );
      throw new Error("Service Error: Unable to update the card.");
    }
  },

  deleteCard: async (id: string): Promise<void> => {
    try {
      await cardRepository.deleteCard(id);
    } catch (error) {
      console.error(
        `Service Error: Failed to delete card with ID ${id}.`,
        error
      );
      throw new Error("Service Error: Unable to delete the card.");
    }
  },
};
