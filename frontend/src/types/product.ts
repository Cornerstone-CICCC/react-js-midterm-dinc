export interface Product {
  id: string;
  name: string;
  price: number;
  userId: string;
  description: string;
  imageUrls: string[];
  status: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface HttpRequestProductData {
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  category: string;
  status?: string;
}