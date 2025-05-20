'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLogin } from '@/hooks/useLogin';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  const pageTitle = 'Login - DINCT';
  const { error, login, loading, setError } = useLogin();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = pageTitle;
    }
  }, [pageTitle]);

  return (
    <div className="min-h-screen flex items-center bg-gray-100 justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md">{error}</div>
        )}

        <LoginForm login={login} loading={loading} setError={setError} />

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#323232] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
