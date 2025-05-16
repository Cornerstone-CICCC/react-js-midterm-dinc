import { Request, Response, NextFunction } from 'express';
import Category from '../models/categoryModel';
import categoriesSeed from '../data/seed/categories';

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true },
    );
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// export const getCategoryProducts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const categoryId = req.params.id;
//     const category = await Category.findById(categoryId).populate('products');
//     if (!category) {
//       res.status(404).json({ message: 'Category not found' });
//     }
//     res.json(category.products);
//   } catch (error) {
//     next(error);
//   }
// }

export const getCategoryByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryName = req.params.name;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categorySlug = req.params.slug;
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};
export const getCategoryByIdWithProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId).populate('products');
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategoryByNameWithProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryName = req.params.name;
    const category = await Category.findOne({ name: categoryName }).populate(
      'products',
    );
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlugWithProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categorySlug = req.params.slug;
    const category = await Category.findOne({ slug: categorySlug }).populate(
      'products',
    );
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const seedCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Setup migrations
    const existingCategories = await Category.find();
    if (existingCategories.length > 0) {
      res.status(400).json({ message: 'Categories already exist' });
    }
    await Category.insertMany(categoriesSeed);
    res.status(201).json({ message: 'Categories seeded successfully' });
  } catch (error) {
    next(error);
  }
};
