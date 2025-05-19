'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useGoogleAuth } from '@/hooks/useGoogleAuth'

export default function AuthCallback() {
  const [message, setMessage] = useState('Authenticating...');
  const router = useRouter();
  const { googleAuth } = useGoogleAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          setMessage('Authentication failed');
          return;
        }

        if (!session.user.email) {
          console.error('Email is required for signup');
          return;
        }

        const data = {
          email: session.user.email,
          name: session?.user.user_metadata.full_name || '',
          password: Math.random().toString(36).slice(-10) + Date.now().toString()
        }

        const response = await googleAuth(data)

        if (!response) {
          setMessage('Failed to authenticate');
          return;
        }

        router.push('/');
      } catch (error) {
        console.error('Authentication error:', error);
        setMessage('An error occurred during authentication');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>{message}</p>
    </div>
  );
}