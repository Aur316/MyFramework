"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardService = void 0;
const factory_1 = require("../factory/factory");
const cardRepository_1 = require("../repository/cardRepository");
exports.cardService = {
    getAllCards: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const docs = yield cardRepository_1.cardRepository.getAllCards();
            return docs.map(factory_1.outputCardFactory);
        }
        catch (error) {
            console.error("Service Error: Failed to retrieve all cards.", error);
            throw new Error("Service Error: Unable to fetch cards.");
        }
    }),
    getCardById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const card = yield cardRepository_1.cardRepository.getCardById(id);
            return card ? (0, factory_1.outputCardFactory)(card) : null;
        }
        catch (error) {
            console.error(`Service Error: Failed to retrieve card with ID ${id}.`, error);
            throw new Error("Service Error: Unable to fetch the requested card.");
        }
    }),
    createCard: (card) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newCard = (0, factory_1.inputCardFactory)(card);
            const savedCard = yield cardRepository_1.cardRepository.createCard(newCard);
            return (0, factory_1.outputCardFactory)(savedCard);
        }
        catch (error) {
            console.error("Service Error: Failed to create a new card.", error);
            throw new Error("Service Error: Unable to create the card.");
        }
    }),
    updateCard: (id, card) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedCard = yield cardRepository_1.cardRepository.updateCard(id, card);
            return updatedCard ? (0, factory_1.outputCardFactory)(updatedCard) : null;
        }
        catch (error) {
            console.error(`Service Error: Failed to update card with ID ${id}.`, error);
            throw new Error("Service Error: Unable to update the card.");
        }
    }),
    deleteCard: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cardRepository_1.cardRepository.deleteCard(id);
        }
        catch (error) {
            console.error(`Service Error: Failed to delete card with ID ${id}.`, error);
            throw new Error("Service Error: Unable to delete the card.");
        }
    }),
};
