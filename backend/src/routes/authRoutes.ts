// import protect from './../middlewares/authMiddleware';
import express from 'express';
import { signup, login, logout } from '../controllers/authController';
import protect from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', protect, logout);

export default userRouter;

