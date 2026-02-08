'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import useAuthStore from '../../../../stores/useAuthStore';

export default function ConditionalDemoPage() {
  const { user, initAuthListener } = useAuthStore();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded bg-gray-800 p-6">
          <h1 className="text-2xl font-semibold">Firebase Demo — Public</h1>
          <p className="mt-2 text-sm text-gray-300">
            This is public demo content visible to everyone.
          </p>
        </section>

        <section className="rounded bg-gray-800 p-6">
          <h2 className="text-xl font-semibold">Protected Demo</h2>
          {user ? (
            <div className="mt-2 text-sm text-gray-200">
              <p>Welcome back, {user.displayName || user.email}!</p>
              <p className="mt-2">Here is some user-only demo content:</p>
              <ul className="mt-2 list-disc pl-5 text-gray-300">
                <li>Exclusive feature A</li>
                <li>Exclusive feature B</li>
                <li>Account email: {user.email}</li>
              </ul>
            </div>
          ) : (
            <div className="mt-2 text-sm text-gray-300">
              <p>You must sign in to see protected demo content.</p>
              <Link
                href="/firebase/signin"
                className="text-blue-400 hover:underline"
              >
                Sign in
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
