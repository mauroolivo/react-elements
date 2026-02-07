'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../../../stores/useAuthStore';

export default function DemoPage() {
  const router = useRouter();
  const { user, logout, initAuthListener } = useAuthStore();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  if (!user)
    return (
      <div>
        No user signed in. <a href="/firebase/signin">Sign in</a>
      </div>
    );

  return (
    <div>
      <h2>Authenticated demo</h2>
      <div>Name: {user.displayName || '(no username)'}</div>
      <div>Email: {user.email}</div>
      <button
        onClick={async () => {
          await logout();
          router.push('/firebase/signin');
        }}
      >
        Sign out
      </button>
    </div>
  );
}
