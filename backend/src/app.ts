import express from 'express';
import productRoutes from './routes/productRoute';
import categoryRoute from './routes/categoryRoute';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoute);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
