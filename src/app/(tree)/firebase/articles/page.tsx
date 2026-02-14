'use client';

import { useEffect, useState } from 'react';
import { fetchArticles, type ArticleDoc } from '../../../../lib/firebase';
import { useAuthStore } from '../../../../stores/useAuthStore';
import ArticleForm from '@/components/ArticleForm';
import { type Article } from '@/models/article';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleDoc[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((s) => s.user);

  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const docs = await fetchArticles();
        if (!mounted) return;
        setArticles(docs);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const docs = await fetchArticles();
      setArticles(docs);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  function formatDate(v: unknown): string {
    if (v === undefined || v === null) return '—';
    try {
      if (
        typeof v === 'object' &&
        v !== null &&
        'toDate' in v &&
        typeof (v as { toDate?: unknown }).toDate === 'function'
      ) {
        return (v as { toDate: () => Date }).toDate().toLocaleString();
      }
      if (v instanceof Date) return v.toLocaleString();
      if (typeof v === 'object' && v !== null && 'seconds' in v) {
        const r = v as Record<string, unknown>;
        const secVal = r['seconds'];
        const nsecVal = r['nanoseconds'];
        const sec = typeof secVal === 'number' ? secVal : Number(secVal ?? 0);
        const nsec =
          typeof nsecVal === 'number' ? nsecVal : Number(nsecVal ?? 0);
        const ms = sec * 1000 + Math.floor(nsec / 1e6);
        return new Date(ms).toLocaleString();
      }
      const n = Number(v as unknown as number);
      if (!Number.isNaN(n)) return new Date(n).toLocaleString();
    } catch (e) {
      console.warn('formatDate error', e);
      // fallthrough
    }
    return String(v);
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded bg-gray-800 p-6">
          <h1 className="text-2xl font-semibold">Articles</h1>
          {user && (
            <div className="mt-3">
              <button
                className="rounded bg-indigo-600 px-3 py-1 text-sm font-medium hover:bg-indigo-500"
                onClick={() => setShowCreate(true)}
              >
                Create New
              </button>
            </div>
          )}
          {loading && <p className="mt-2 text-sm text-gray-400">Loading...</p>}
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          {!loading && !error && (
            <ul className="mt-4 space-y-3">
              {articles && articles.length > 0 ? (
                articles.map((a) => {
                  const article: Article = a.data;
                  console.log(article.createdAt);
                  return (
                    <li key={a.id} className="rounded bg-slate-700 p-3">
                      <div className="text-sm text-gray-200">ID: {a.id}</div>
                      <div className="text-xs text-gray-400">
                        Created: {formatDate(a.data.createdAt)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Valid from: {formatDate(a.data.validFrom)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Valid until: {formatDate(a.data.validUntil)}
                      </div>
                      <div className="mt-1 text-sm text-gray-300">
                        <div className="font-medium">{article.title}</div>
                        <div className="text-xs text-gray-400">
                          Tags: {article.tags.join(', ')}
                        </div>
                        <p className="mt-2 text-sm text-gray-300">
                          {article.content}
                        </p>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="text-sm text-gray-400">No articles found.</li>
              )}
            </ul>
          )}
        </section>
      </div>
      {showCreate && (
        <ArticleForm
          onCancelAction={() => setShowCreate(false)}
          onCreatedAction={async () => {
            setShowCreate(false);
            await refresh();
          }}
        />
      )}
    </div>
  );
}
