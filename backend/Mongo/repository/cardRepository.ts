import { CardDocument } from "../../model/cardModel";
import { useMongoAPI } from "../database/useMongoAPI";

const { findAll, findById, insertOne, updateOne, deleteOne } =
  useMongoAPI<CardDocument>("cards");

export const cardRepository = {
  getAllCards: findAll,
  getCardById: findById,
  createCard: insertOne,
  updateCard: updateOne,
  deleteCard: deleteOne,
};
