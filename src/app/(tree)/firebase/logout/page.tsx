'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../../../stores/useAuthStore';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    let mounted = true;
    async function run() {
      try {
        await logout();
      } catch (e) {
        console.error('Logout error', e);
      }
      if (mounted) router.push('/firebase/signin');
    }
    run();
    return () => {
      mounted = false;
    };
  }, [router, logout]);

  return <div>Signing out...</div>;
}
