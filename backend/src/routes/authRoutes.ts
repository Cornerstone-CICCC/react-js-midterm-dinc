// import protect from './../middlewares/authMiddleware';
import express from 'express';
import { signup, login, logout, googleAuth } from '../controllers/authController';
import protect from '../middlewares/authMiddleware';

const authRouter = express.Router();

authRouter.post('/google', googleAuth);
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', protect, logout);

export default authRouter;

