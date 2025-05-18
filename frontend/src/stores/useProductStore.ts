'use client';

import { Product } from '@/types/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductState {
  product: Product | null;
  setProduct: (product: Product | null) => void;
  updateProduct: (updates: Partial<Product>) => void;
}

const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      product: null,
      setProduct: (product) => set({ product }),
      updateProduct: (updates) =>
        set((state) => ({
          product: state.product ? { ...state.product, ...updates } : null,
        })),
    }),
    {
      name: 'product-store',
    },
  ),
);

export default useProductStore;

