import { useState } from 'react';
import { User, GetUserApiResponse } from '@/types/user';
import useSWR, { mutate } from 'swr';

type useUserType = {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  onSubmit: (data: User) => Promise<boolean>;
  loading: boolean;
  showError: boolean;
  errorMessage: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }
  const data: GetUserApiResponse = await res.json();
  if (!data.success) {
    throw new Error('Failed to fetch user');
  }
  return data.user;
};

export function useUser(userId: string | undefined): useUserType {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const {
    data,
    error,
    isLoading: isFetching,
  } = useSWR<User>(`${apiBaseUrl}/users/${userId}`, fetcher);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const onSubmit = async (data: User) => {
    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/users/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result: GetUserApiResponse = await res.json();

      if (!res.ok || !result.success) {
        setErrorMessage(
          'Failed to update your profile. Please try again later.',
        );
        setShowError(true);
        return false;
      }

      if (res.ok && result.success) {
        setShowError(false);
        mutate(`${apiBaseUrl}/users/${data.id}`);
      }

      return true;
    } catch (err) {
      console.log(err, 'failed editing');
      setShowError(true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user: data,
    isLoading: isFetching,
    isError: !!error,
    onSubmit,
    loading,
    showError,
    errorMessage,
  };
}
