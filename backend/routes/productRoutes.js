import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  searchProducts,
  getProductById,
  getNewProducts,
  getRandomProducts,
  getFilterOptions,
} from "../controllers/productController.js";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authenticateAdmin, createProduct);
router.get("/get", searchProducts);
router.get("/get/new", getNewProducts);
router.get("/get/random", getRandomProducts);
router.get("/get/all", authenticate, authenticateAdmin, getAllProducts);
router.get("/get/filterOptions", getFilterOptions);
router.get("/get/:category", getProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authenticateAdmin, updateProduct)
  .delete(authenticate, authenticateAdmin, deleteProduct);

export default router;
