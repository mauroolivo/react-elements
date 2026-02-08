'use client';

import { useEffect, useState } from 'react';
import { fetchArticles, type ArticleDoc } from '../../../../lib/firebase';
import { type Article } from '../../../../lib/firebase';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleDoc[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded bg-gray-800 p-6">
          <h1 className="text-2xl font-semibold">Articles</h1>
          {loading && <p className="mt-2 text-sm text-gray-400">Loading...</p>}
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          {!loading && !error && (
            <ul className="mt-4 space-y-3">
              {articles && articles.length > 0 ? (
                articles.map((a) => {
                  const article: Article = a.data;
                  return (
                    <li key={a.id} className="rounded bg-slate-700 p-3">
                      <div className="text-sm text-gray-200">ID: {a.id}</div>
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
    </div>
  );
}
