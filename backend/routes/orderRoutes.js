import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  markOrderAsDelivered,
  markOrderAsPaid,
} from "../controllers/orderController.js";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, getUserOrders);
router.route("/all").get(authenticate, authenticateAdmin, getAllOrders);
router.get("/:id", authenticate, getOrderById);
router.put("/:id/pay", authenticate, markOrderAsPaid);
router.put(
  "/:id/deliver",
  authenticate,
  authenticateAdmin,
  markOrderAsDelivered
);

export default router;
