'use client'

import { useEffect, useState } from 'react';
import getFirebaseApp, { getFirebaseAnalytics } from '../lib/firebase';

export default function FirebaseClient() {
  const [status, setStatus] = useState<'idle' | 'initializing' | 'initialized' | 'error'>('initializing');

  useEffect(() => {
    try {
      const app = getFirebaseApp();
      const analytics = getFirebaseAnalytics();
      console.log('Firebase initialized', { app, analytics });
      Promise.resolve().then(() => setStatus('initialized'));
    } catch (err) {
      console.error('Firebase initialization error', err);
      Promise.resolve().then(() => setStatus('error'));
    }
  }, []);

  return <div>Firebase status: {status}</div>;
}
