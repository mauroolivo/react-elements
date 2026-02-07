'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuthStore from '../../../../stores/useAuthStore';

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signup, signinWithGoogle, loading, error, initAuthListener } =
    useAuthStore();

  useEffect(() => {
    initAuthListener();
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (user) timeoutId = setTimeout(() => router.push('/firebase/demo'), 3000);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [router, user, initAuthListener]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signup(username || null, email, password);
      router.push('/firebase/demo');
    } catch (err) {
        console.log('Signup error', err);
      // errors surfaced via store.error
    }
  }

  async function handleGoogle() {
    try {
      await signinWithGoogle();
      router.push('/firebase/demo');
    } catch (err) {
        console.log('Google signup error', err);
      // handled in store
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      {user ? (
        <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 text-gray-100 shadow-md">
          <h2 className="text-lg font-semibold">You are already signed in</h2>
          <p className="mt-2">Redirecting to demo...</p>
        </div>
      ) : (
        <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-100">
            Create an account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-60"
              >
                {loading ? 'Creating...' : 'Create account'}
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? 'Please wait...' : 'Continue with Google'}
              </button>
            </div>
          </form>

          {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              href="/firebase/signin"
              className="text-blue-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
