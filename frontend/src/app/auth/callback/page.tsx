'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { Spinner } from '@/components/ui/spinner';

export default function AuthCallback() {
  const pageTitle = 'Login - DINCT';
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { googleAuth } = useGoogleAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = pageTitle;
    }
  }, [pageTitle]);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const callbackUrl = searchParams.get('callbackUrl') || '/';

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        );

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          setMessage('Authentication failed');
          return;
        }

        if (!session.user.email) {
          console.error('Email is required');
          return;
        }

        const data = {
          email: session.user.email,
          name: session?.user.user_metadata.full_name || '',
          password:
            Math.random().toString(36).slice(-10) + Date.now().toString(),
        };

        const response = await googleAuth(data);

        if (!response) {
          setMessage('Failed to authenticate');
          return;
        }

        console.log('Redirecting to:', callbackUrl);
        router.push(callbackUrl);
      } catch (error) {
        console.error('Authentication error:', error);
        setMessage('An error occurred during authentication');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {message ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <Spinner size={'large'}>Authenticating with Google...</Spinner>
      )}
    </div>
  );
}
