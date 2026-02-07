'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signupWithEmail } from '../../../../lib/firebase';
import { onAuthChanged } from '../../../../lib/firebase';
import type { User } from 'firebase/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const unsub = onAuthChanged((u) => {
      setUser(u);
      if (u) {
        // small delay so the "already signed in" message is visible
        timeoutId = setTimeout(() => router.push('/firebase/demo'), 3000);
      }
    });
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      unsub();
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signupWithEmail(username || null, email, password);
      router.push('/firebase/demo');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Signup failed');
    } finally {
      setLoading(false);
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
