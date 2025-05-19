import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { HttpRequestProductData, Product } from '@/types/product';
import { User } from '@/types/user';
import { useProductStore } from '@/store/productStore';

interface useWorkType {
  createWork: (data: HttpRequestProductData) => Promise<boolean>;
  updateWork: (id: string, data: HttpRequestProductData) => Promise<boolean>;
  loading: boolean;
  showError: boolean;
  errorMessage: string;
  productData: Product | undefined;
  userData: User | undefined;
  error: Error | undefined;
  isFetching: boolean;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }
  const data = await res.json();
  if (!data) {
    throw new Error('Failed to fetch product');
  }
  return data;
};

export const useWork = (productId: string | undefined): useWorkType => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const setProduct = useProductStore((state) => state.setProduct);

  const {
    data,
    error,
    isLoading: isFetching,
  } = useSWR<Product>(`${apiBaseUrl}/products/${productId}`, fetcher, {
    onSuccess: (data) => {
      setProduct(data);
    },
  });

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Create a new work
  const createWork = async (data: HttpRequestProductData) => {
    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result) {
        setErrorMessage('Failed to create work');
        setShowError(true);
        return false;
      }

      if (res.ok && result) {
        setShowError(false);
        mutate(`${apiBaseUrl}/products`);
      }

      return true;
    } catch (err) {
      console.log(err, 'failed creating work');
      setShowError(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update a work
  const updateWork = async (id: string, data: HttpRequestProductData) => {
    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result) {
        setErrorMessage('Failed to update work');
        setShowError(true);
        return false;
      }

      if (res.ok && result) {
        setShowError(false);
        mutate(`${apiBaseUrl}/products`);
      }

      return true;
    } catch (err) {
      console.log(err, 'failed updating work');
      setShowError(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createWork,
    updateWork,
    loading,
    showError,
    errorMessage,
    productData: data,
    userData: undefined,
    error,
    isFetching,
  };
};
