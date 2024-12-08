import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  getProductById,
  getNewProducts,
} from "../controllers/productController.js";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(authenticate, authenticateAdmin, createProduct);
router.get("/all", authenticate, authenticateAdmin, getAllProducts);
router.get("/new", getNewProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authenticateAdmin, updateProduct)
  .delete(authenticate, authenticateAdmin, deleteProduct);

export default router;
