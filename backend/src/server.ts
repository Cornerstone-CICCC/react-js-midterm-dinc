import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoute';
``;

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// Define Routes
app.get('/', (req: Request, res: Response) => {
  res.send('API Running');
});
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
