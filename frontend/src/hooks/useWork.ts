import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Product, HttpRequestProductData } from '@/types/product';
import useUserStore from '@/stores/useUserStore';

export const useWork = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useUserStore();

  // Get a work by id
  const getWorkById = async (id: string) => {
    const res = await fetch(`${apiBaseUrl}/products/${id}`);
    const result = await res.json();
    return result;
  };

  // Create a new work
  const createWork = async (data: HttpRequestProductData) => {
    setLoading(true);
    data.userId = user?.id;

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

  return {
    createWork,
    getWorkById,
    loading,
    showError,
    errorMessage,
  };
};
