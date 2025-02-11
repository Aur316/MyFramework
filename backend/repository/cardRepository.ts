import { useMongoAPI } from "../database/Mongo/useMongoAPI";
import { CardDocument } from "../model/cardModel";

const { findAll, findById, insertOne, updateOne, deleteOne } =
  useMongoAPI<CardDocument>("cards");

export const cardRepository = {
  getAllCards: findAll,
  getCardById: findById,
  createCard: insertOne,
  updateCard: updateOne,
  deleteCard: deleteOne,
};
