'use client';
import { useState } from 'react';

const STORAGE_KEY = 'cookie_consent';

export default function CookiePreferencesPage() {
  const [necessary] = useState(true);
  const [analytics, setAnalytics] = useState(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v) {
        const parsed = JSON.parse(v);
        if (parsed.mode === 'all') return true;
        if (parsed.preferences) return Boolean(parsed.preferences.analytics);
      }
    } catch {
      /* ignore */
    }
    return false;
  });
  const [marketing, setMarketing] = useState(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v) {
        const parsed = JSON.parse(v);
        if (parsed.mode === 'all') return true;
        if (parsed.preferences) return Boolean(parsed.preferences.marketing);
      }
    } catch {
      /* ignore */
    }
    return false;
  });

  function savePreferences() {
    const value = {
      mode: analytics || marketing ? 'custom' : 'necessary',
      preferences: { analytics, marketing },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    alert('Preferences saved');
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Cookie preferences</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded bg-white p-4 dark:bg-slate-800">
          <div>
            <div className="font-medium">Necessary cookies</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Always active
            </div>
          </div>
          <div>
            <input type="checkbox" checked={necessary} readOnly />
          </div>
        </div>

        <div className="flex items-center justify-between rounded bg-white p-4 dark:bg-slate-800">
          <div>
            <div className="font-medium">Analytics cookies</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Help us improve the site
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded bg-white p-4 dark:bg-slate-800">
          <div>
            <div className="font-medium">Marketing cookies</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Used for advertising
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={savePreferences}
            className="rounded bg-amber-500 px-4 py-2 text-white"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}
