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
exports.cardController = void 0;
const cardService_1 = require("../service/cardService");
exports.cardController = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cards = yield cardService_1.cardService.getAllCards();
            res.json(cards);
        }
        catch (error) {
            console.error("Controller Error: Failed to retrieve all cards.", error);
            res
                .status(500)
                .json({ error: "Internal Server Error: Unable to fetch cards." });
        }
    }),
    getById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const card = yield cardService_1.cardService.getCardById(req.params.id);
            if (!card) {
                res.status(404).json({ error: "Card not found." });
                return;
            }
            res.json(card);
        }
        catch (error) {
            console.error(`Controller Error: Failed to retrieve card with ID ${req.params.id}.`, error);
            res
                .status(500)
                .json({
                error: "Internal Server Error: Unable to fetch the requested card.",
            });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newCard = yield cardService_1.cardService.createCard(req.body);
            res.status(201).json(newCard);
        }
        catch (error) {
            console.error("Controller Error: Failed to create a new card.", error);
            res
                .status(500)
                .json({ error: "Internal Server Error: Unable to create the card." });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedCard = yield cardService_1.cardService.updateCard(req.params.id, req.body);
            if (!updatedCard) {
                res.status(404).json({ error: "Card not found." });
                return;
            }
            res.json(updatedCard);
        }
        catch (error) {
            console.error(`Controller Error: Failed to update card with ID ${req.params.id}.`, error);
            res
                .status(500)
                .json({ error: "Internal Server Error: Unable to update the card." });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cardService_1.cardService.deleteCard(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            console.error(`Controller Error: Failed to delete card with ID ${req.params.id}.`, error);
            res
                .status(500)
                .json({ error: "Internal Server Error: Unable to delete the card." });
        }
    }),
};
