'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const schema = z.object({
  email: z.email({ error: 'my custom message invalid email' }),
  password: z.string().min(6, { error: 'my custom message min 6 chars' }),
  remember: z.boolean(),
});
type FormFields = z.infer<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormFields) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error('Simulated sign-in error');
    } catch (error) {
      setError('root', {
        message: `${(error as Error).message}. Please try again.`,
      });
    }
  }
  return (
    <main className="mx-auto max-w-md p-4 sm:max-w-lg md:max-w-xl">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900"
      >
        <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Sign in
        </h1>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              {...register('password')}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                {...register('remember')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="reset"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        {errors.root && (
          <p className="mt-6 text-center text-sm text-red-600 dark:text-red-400">
            {errors.root.message}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <a
            href="#"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Create one
          </a>
        </p>
      </form>
    </main>
  );
}
