import { Card } from "../../Mongo/model/cardModel";
import { redisCrud } from "../../Redis/redisCrud";
import { inputCardFactory, outputCardFactory } from "../factory/factory";
import { cardRepository } from "../repository/cardRepository";

const CACHE_KEY = "all_cards";

export const cardService = {
  getAllCards: async (): Promise<Card[]> => {
    try {
      const cachedData = await redisCrud.getRedis<Card[]>(CACHE_KEY);

      if (cachedData) {
        console.log("Cache Hit: Cards retrieved from Redis.");
        return cachedData;
      }

      console.log("Cache Miss: Fetching cards from database...");
      const docs = await cardRepository.getAllCards();
      const transformedDocs = docs.map(outputCardFactory);

      await redisCrud.addRedis(CACHE_KEY, transformedDocs, 300);

      return transformedDocs;
    } catch (error) {
      console.error("Service Error: Failed to retrieve all cards.", error);
      throw new Error("Service Error: Unable to fetch cards.");
    }
  },

  getCardById: async (id: string): Promise<Card | null> => {
    try {
      const card = await cardRepository.getCardById(id);
      return card ? outputCardFactory(card) : null;
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
      const newCard = inputCardFactory(card);
      const savedCard = await cardRepository.createCard(newCard);
      return outputCardFactory(savedCard);
    } catch (error) {
      console.error("Service Error: Failed to create a new card.", error);
      throw new Error("Service Error: Unable to create the card.");
    }
  },

  updateCard: async (id: string, card: Partial<Card>): Promise<Card | null> => {
    try {
      const updatedCard = await cardRepository.updateCard(id, card);
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
