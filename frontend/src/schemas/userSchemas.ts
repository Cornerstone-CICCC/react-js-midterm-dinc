'use client';

import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .min(3, 'Name must be 3-30 characters')
    .max(30, 'Name must be 3-30 characters'),
  bio: z.string().max(150, 'Bio must be under 150 characters'),
  userName: z
    .string()
    .nonempty('Username is required')
    .min(3, 'Username must be 3-30 characters')
    .max(30, 'Username must be 3-30 characters'),
  location: z.string().max(30, 'Location must be under 30 characters').nonempty('Location is required'),
});

export type UserFormInputs = z.infer<typeof userSchema>;
