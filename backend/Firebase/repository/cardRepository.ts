import { Card } from "../../Mongo/model/cardModel";
import { useFirebaseAPI } from "../database/useFireBaseAPI";

const { findAll, findById, insertOne, updateOne, deleteOne } =
  useFirebaseAPI<Card>("cards");

export const cardRepository = {
  getAllCards: findAll,
  getCardById: findById,
  createCard: insertOne,
  updateCard: updateOne,
  deleteCard: deleteOne,
};
