import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(authenticate, authenticateAdmin, createCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(authenticate, authenticateAdmin, updateCategory)
  .delete(authenticate, authenticateAdmin, deleteCategory);

export default router;
