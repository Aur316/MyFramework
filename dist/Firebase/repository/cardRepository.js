"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRepository = void 0;
const useFireBaseAPI_1 = require("../database/useFireBaseAPI");
const { findAll, findById, insertOne, updateOne, deleteOne } = (0, useFireBaseAPI_1.useFirebaseAPI)("cards");
exports.cardRepository = {
    getAllCards: findAll,
    getCardById: findById,
    createCard: insertOne,
    updateCard: updateOne,
    deleteCard: deleteOne,
};
