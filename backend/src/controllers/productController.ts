import { Request, Response, NextFunction } from 'express';
import Product from '../models/productModel';
import mongoose from 'mongoose';

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Solve the following:
    // Pagination
    // User
    // Category
    // Search

    const products = await Product.find();
    if (products.length === 0) {
      res.status(200).json([]);
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, price, description, imageUrl, categoryId, userId } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl,
      categoryId,
      userId,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    const { name, price, description, imageUrl, categoryId } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, imageUrl, categoryId },
      { new: true },
    );
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = req.params.category;
    const products = await Product.find({
      categoryId: new mongoose.Types.ObjectId(category),
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found in this category' });
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query.q;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsByPriceRange = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { min, max } = req.query;
    const products = await Product.find({
      price: { $gte: min, $lte: max },
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found in this price range' });
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    const products = await Product.find({ userId });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found for this user' });
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
};
