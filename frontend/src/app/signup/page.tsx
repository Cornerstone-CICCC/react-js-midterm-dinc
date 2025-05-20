'use client';

import { useSignup } from '@/hooks/useSignup';
import SignupForm from '@/components/auth/SignupForm';
import { useEffect } from 'react';

const SignupPage = () => {
  const pageTitle = 'Signup - DINCT';
  const { signup, loading, error, setError } = useSignup();

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
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to create an account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md">{error}</div>
        )}

        <SignupForm signup={signup} loading={loading} setError={setError} />
      </div>
    </div>
  );
};

export default SignupPage;
