import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Product } from '@/types/product';
import useProductStore from '@/stores/useProductStore';

interface useWorkType {
  createWork: (data: Partial<Product>) => Promise<boolean>;
  updateWork: (id: string, data: Partial<Product>) => Promise<boolean>;
  deleteWork: (id: string) => Promise<boolean>;
  loading: boolean;
  showError: boolean;
  errorMessage: string;
  data: Product | undefined;
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

export const useWork = (productId?: string): useWorkType => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const { setProduct } = useProductStore();

  const {
    data,
    error,
    isLoading: isFetching,
  } = useSWR<Product>(
    productId ? `${apiBaseUrl}/products/${productId}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data) {
          setProduct(data);
        }
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1分間は重複リクエストを防ぐ
    },
  );

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Create a new work
  const createWork = async (data: Partial<Product>) => {
    setLoading(true);
    console.log(data);

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
        setProduct(result);
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
  const updateWork = async (id: string, data: Partial<Product>) => {
    setLoading(true);
    console.log(id, data);
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
        setProduct(result);
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

  // Delete a work
  const deleteWork = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        setErrorMessage('Failed to delete work');
        setShowError(true);
        return false;
      }

      if (res.ok) {
        setProduct(null);
        mutate(`${apiBaseUrl}/products`);
      }

      return true;
    } catch (err) {
      console.log(err, 'failed deleting work');
      setShowError(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createWork,
    updateWork,
    deleteWork,
    loading,
    showError,
    errorMessage,
    data,
    error,
    isFetching,
  };
};
