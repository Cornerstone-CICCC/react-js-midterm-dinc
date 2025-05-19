import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

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
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          <span>{buttonText}</span>
        </>
      )}
    </button>
  )
}

export default GoogleAuth