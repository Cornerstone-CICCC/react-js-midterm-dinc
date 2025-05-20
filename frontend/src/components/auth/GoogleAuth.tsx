import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
import Image from 'next/image'

type GoogleAuthProps = {
  type?: 'signup' | 'login'
}

const GoogleAuth = ({ type }: GoogleAuthProps) => {
  const [loading, setLoading] = useState(false)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account'
          }
        }
      })

      if (error) {
        console.log('Google auth error:', error.message)
      }
    } catch (err) {
      console.log('Unexpected error:', err)
    } finally {
      setLoading(false)
    }
  }

  const buttonText = type === 'login'
    ? 'Login with Google'
    : 'Sign up with Google'

  return (
    <button
      type="button"
      onClick={handleGoogleSignUp}
      disabled={loading}
      className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-70"
    >
      <Image
        src="https://www.google.com/favicon.ico"
        alt="Google"
        width={20}
        height={20}
        className="w-5 h-5 mr-2"
      />
      <span className="text-sm">{buttonText}</span>
    </button>
  )
}

export default GoogleAuth