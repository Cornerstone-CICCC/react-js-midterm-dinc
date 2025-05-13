'use client';

import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title must be 3-30 characters')
    .max(30, 'Title must be 3-30 characters'),
  description: z.string().max(150, 'Description must be under 150 characters'),
  price: z
    .number()
    .min(0, 'Price must be a positive number')
    .max(1000000, 'Price must be less than 1,000,000'),
  image: z
    .array(z.string().url('Invalid image URL'))
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed'),
  category: z.string().nonempty('Category is required'),
});

export type ProductFormInputs = z.infer<typeof productSchema>;
