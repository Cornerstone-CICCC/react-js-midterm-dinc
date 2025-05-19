import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import path from 'path';
import { connectDB } from '../../config/db';
import Product from '../../models/productModel';
import { IUser } from '../../types/user';
import fs from 'fs';

const products = [
  {
    name: 'Sunset Overdrive',
    price: 120,
    description: 'A vibrant acrylic painting capturing the golden hour.',
    imageUrls: ['https://picsum.photos/seed/picsum/500/400.jpg'],
    status: 'active',
    userId: '68299041a8c31d92fa62a1df',
    categorySlug: 'paintings',
  },
  {
    name: 'Urban Solitude',
    price: 75.5,
    description: 'Graphite sketch of a figure in a modern cityscape.',
    imageUrls: ['https://picsum.photos/seed/picsum/500/400.jpg'],
    status: 'active',
    userId: '68299041a8c31d92fa62a1e2',
    categorySlug: 'drawings',
  },
  {
    name: 'Dreams in Digital',
    price: 250,
    description: 'Surreal digital art blending fantasy and architecture.',
    imageUrls: ['https://picsum.photos/seed/picsum/500/400.jpg'],
    status: 'inactive',
    userId: '68299042a8c31d92fa62a1e5',
    categorySlug: 'digital-art',
  },
  {
    name: 'Whispering Stone',
    price: 320,
    description: 'Conceptual sculpture carved from limestone.',
    imageUrls: ['https://picsum.photos/seed/picsum/500/400.jpg'],
    status: 'sold',
    userId: '68299041a8c31d92fa62a1df',
    categorySlug: 'sculptures',
  },
  {
    name: 'Ethereal Realms',
    price: 310,
    description: 'A digital dreamscape, glowing with cosmic fantasy.',
    imageUrls: ['https://picsum.photos/seed/picsum/500/400.jpg'],
    status: 'active',
    userId: '68299042a8c31d92fa62a1e5',
    categorySlug: 'digital-art',
  },
];

export const seedproducts = async () => {
  await connectDB();

  console.log('Seeding products...');
  console.log(`Total products to seed: ${products.length}`);
  console.log('----------------------------------');

  for (const product of products) {
    await Product.create({
      ...product,
    });

    console.log(`✅ Inserted product`);
  }

  mongoose.connection.close();
  console.log('🎉 product seeding complete.');
};

seedproducts();
