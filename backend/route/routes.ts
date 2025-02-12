import express from "express";
import { mongoCardController } from "../Mongo/controller/cardController";
import { firebaseCardController } from "../Firebase/controller/cardController";
const router = express.Router();

const controller = false ? mongoCardController : firebaseCardController;

router.get("/cards", controller.getAll);
router.get("/cards/:id", controller.getById);
router.post("/cards", controller.create);
router.put("/cards/:id", controller.update);
router.delete("/cards/:id", controller.delete);

export default router;
