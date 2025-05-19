import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { HttpRequestProductData } from '@/types/product';

export const useWork = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Get a work by id
  const getWorkById = async (id: string) => {
    const res = await fetch(`${apiBaseUrl}/products/${id}`);
    const result = await res.json();
    return result;
  };

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
  };
};
