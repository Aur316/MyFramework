"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardController_1 = require("../Mongo/controller/cardController");
const cardController_2 = require("../Firebase/controller/cardController");
const router = express_1.default.Router();
const controller = false ? cardController_1.mongoCardController : cardController_2.firebaseCardController;
router.get("/cards", controller.getAll);
router.get("/cards/:id", controller.getById);
router.post("/cards", controller.create);
router.put("/cards/:id", controller.update);
router.delete("/cards/:id", controller.delete);
exports.default = router;
