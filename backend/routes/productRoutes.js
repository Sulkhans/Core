import express from "express";
import { createProduct } from "../controllers/productController.js";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createProduct);

export default router;
