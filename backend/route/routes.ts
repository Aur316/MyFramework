import express from "express";
import { cardController } from "../Mongo/controller/cardController";

const router = express.Router();

router.get("/cards", cardController.getAll);
router.get("/cards/:id", cardController.getById);
router.post("/cards", cardController.create);
router.put("/cards/:id", cardController.update);
router.delete("/cards/:id", cardController.delete);

export default router;
