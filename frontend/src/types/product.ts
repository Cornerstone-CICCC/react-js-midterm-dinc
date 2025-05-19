export interface Product {
  id: string;
  name: string;
  price: number;
  userId: string;
  description: string;
  imageUrl: string;
  status: string;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}

export interface HttpRequestProductData {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: string;
  userId?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

