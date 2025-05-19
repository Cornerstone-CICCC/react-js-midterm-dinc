import { User } from './user';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  status: string;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}