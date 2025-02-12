import { Request, Response } from "express";
import { cardService } from "../service/cardService";
import { Card } from "../../Mongo/model/cardModel";

export const firebaseCardController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const cards = await cardService.getAllCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Firebase cards" });
    }
  },

  getById: async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const card = await cardService.getCardById(req.params.id);
      if (!card) {
        res.status(404).json({ error: "Card not found." });
        return;
      }
      res.json(card);
    } catch (error) {
      console.error(
        `Controller Error: Failed to retrieve card with ID ${req.params.id}.`,
        error
      );
      res.status(500).json({
        error: "Internal Server Error: Unable to fetch the requested card.",
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const newCard: Card = await cardService.createCard(req.body);
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: "Failed to create card" });
    }
  },

  update: async (
    req: Request<{ id: string }, {}, Partial<Card>>,
    res: Response
  ): Promise<void> => {
    try {
      const updatedCard: Card | null = await cardService.updateCard(
        req.params.id,
        req.body
      );
      if (!updatedCard) {
        res.status(404).json({ error: "Card not found." });
        return;
      }
      res.json(updatedCard);
    } catch (error) {
      console.error(
        `Controller Error: Failed to update card with ID ${req.params.id}.`,
        error
      );
      res
        .status(500)
        .json({ error: "Internal Server Error: Unable to update the card." });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await cardService.deleteCard(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error(
        `Controller Error: Failed to delete card with ID ${req.params.id}.`,
        error
      );
      res.status(500).json({ error: "Failed to delete card" });
    }
  },
};
