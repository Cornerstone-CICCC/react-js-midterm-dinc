import express from "express";
import { getUserById, updateUserById } from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.get("/:id", getUserById);
userRouter.patch("/:id", protect, updateUserById);

export default userRouter;