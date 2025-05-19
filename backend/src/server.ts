import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// Define Routes
app.get('/', (req: Request, res: Response) => {
  res.send('API Running');
});
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
