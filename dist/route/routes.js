"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardController_1 = require("../Mongo/controller/cardController");
const router = express_1.default.Router();
router.get("/cards", cardController_1.cardController.getAll);
router.get("/cards/:id", cardController_1.cardController.getById);
router.post("/cards", cardController_1.cardController.create);
router.put("/cards/:id", cardController_1.cardController.update);
router.delete("/cards/:id", cardController_1.cardController.delete);
exports.default = router;
