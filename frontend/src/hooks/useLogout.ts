import useUserStore from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const logout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Failed to log out');
      }

      localStorage.removeItem('token');
      setUser(null);

      router.push('/login');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { logout };
};