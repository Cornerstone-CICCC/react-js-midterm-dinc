import { create } from 'zustand';
import { Product } from '@/types/product';

interface ProductState {
  product: Product | null;
  setProduct: (product: Product | null) => void;
  clearProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
  clearProduct: () => set({ product: null }),
}));
