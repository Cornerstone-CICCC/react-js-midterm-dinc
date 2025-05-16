export interface Product {
  id: string;
  name: string;
  price: number;
  userId: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

