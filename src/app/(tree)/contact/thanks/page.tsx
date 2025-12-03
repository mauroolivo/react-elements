export default async function Thanks({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  const name = typeof params.name === 'string' ? params.name : '';

  return (
    <main className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Form successfully submitted
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Thank you{' '}
        <span className="font-medium text-blue-600 dark:text-blue-400">
          {name}
        </span>
        , we will be in touch soon.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <a href="/contact"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800"
        >
          Back to form
        </a>
        <a href="/contact"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Go to Home
        </a>
      </div>
    </main>
  );
}
