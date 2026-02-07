'use client';

import { useEffect, useState } from 'react';
import { onAuthChanged, logoutFirebase } from '../../../../lib/firebase';
import type { User } from 'firebase/auth';

export default function DemoPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthChanged((u) => setUser(u));
    return unsub;
  }, []);

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
      <button onClick={() => logoutFirebase()}>Sign out</button>
    </div>
  );
}
