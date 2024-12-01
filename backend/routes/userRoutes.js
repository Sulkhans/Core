import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  changePassword,
  updateUserAdmin,
} from "../controllers/userController.js";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authenticateAdmin, getAllUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);
router.put("/password", authenticate, changePassword);
router
  .route("/:id")
  .delete(authenticate, authenticateAdmin, deleteUserById)
  .put(authenticate, authenticateAdmin, updateUserAdmin);

export default router;
