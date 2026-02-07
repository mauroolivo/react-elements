'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutFirebase } from '../../../../lib/firebase';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function run() {
      try {
        await logoutFirebase();
      } catch (e) {
        console.error('Logout error', e);
        // ignore
      }
      if (mounted) router.push('/firebase/signin');
    }
    run();
    return () => {
      mounted = false;
    };
  }, [router]);

  return <div>Signing out...</div>;
}
