import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardRoutes from "../route/routes";
import { connectToDatabase } from "../database/Mongo/mongodb";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", cardRoutes);

const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
