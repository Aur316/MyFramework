"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRepository = void 0;
const useMongoAPI_1 = require("../database/useMongoAPI");
const { findAll, findById, insertOne, updateOne, deleteOne } = (0, useMongoAPI_1.useMongoAPI)("cards");
exports.cardRepository = {
    getAllCards: findAll,
    getCardById: findById,
    createCard: insertOne,
    updateCard: updateOne,
    deleteCard: deleteOne,
};
