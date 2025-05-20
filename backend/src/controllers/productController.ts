import { Request, Response, NextFunction } from 'express';
import Product from '../models/productModel';
import mongoose from 'mongoose';
import { RequestWithUser } from '../middlewares/authMiddleware';
import { lookup } from 'dns';

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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { userId, category, search } = req.query;

    const filter: any = {};

    // Filter by user
    if (userId) {
      filter.userId = userId;
    }

    // Filter by categorySlug
    if (category) {
      filter.categorySlug = category;
    }

    // Search by name or description (case-insensitive)
    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      filter.$or = [{ name: searchRegex }, { description: searchRegex }];
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional: newest first

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
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
    const product = await Product.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(productId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          name: 1,
          price: 1,
          description: 1,
          imageUrls: 1,
          categorySlug: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          user: {
            id: '$user._id',
            name: '$user.name',
            email: '$user.email',
            userName: '$user.userName',
            bio: '$user.bio',
            fileId: '$user.fileId',
            lastLogin: '$user.lastLogin',
            isLoggedIn: '$user.isLoggedIn',
            createdAt: '$user.createdAt',
            updatedAt: '$user.updatedAt',
          },
        },
      },
    ]);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const { name, price, description, imageUrls, categorySlug } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrls,
      categorySlug,
      userId,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    // status
    // categorySlug
    const userId = req.user?.id;
    const productId = req.params.id;
    const { name, price, description, imageUrls, categorySlug } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(productId), userId },
      { name, price, description, imageUrls, categorySlug },
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
      categorySlug: category,
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
