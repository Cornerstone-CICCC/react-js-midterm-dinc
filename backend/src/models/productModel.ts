import mongoose, { Schema, model } from 'mongoose';
import { IProduct } from '../types/product';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array<String>,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'sold'],
      default: 'active',
    },
    categorySlug: {
      type: String,
      ref: 'Category',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<IProduct>('Product', productSchema);

export default Product;
export { productSchema };
