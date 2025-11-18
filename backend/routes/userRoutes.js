import express from "express";
import { registerUser, loginUser, getEmployees, getAllUsers } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/employees", protect, getEmployees);
router.get("/", protect, getAllUsers);

export default router;
