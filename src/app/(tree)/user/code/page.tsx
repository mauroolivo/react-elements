'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema: exactly 6 digits
const CodeSchema = z.object({
  d0: z.string().regex(/^\d$/, '0-9'),
  d1: z.string().regex(/^\d$/, '0-9'),
  d2: z.string().regex(/^\d$/, '0-9'),
  d3: z.string().regex(/^\d$/, '0-9'),
  d4: z.string().regex(/^\d$/, '0-9'),
  d5: z.string().regex(/^\d$/, '0-9'),
});

type CodeFields = z.infer<typeof CodeSchema>;

const DIGIT_KEYS = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5'] as const;
type DigitKey = (typeof DIGIT_KEYS)[number];

export default function Page() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [message, setMessage] = useState<string | null>(null);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    control,
    getValues,
  } = useForm<CodeFields>({
    resolver: zodResolver(CodeSchema),
    defaultValues: { d0: '', d1: '', d2: '', d3: '', d4: '', d5: '' },
    mode: 'onSubmit',
  });

  // Subscribe for rendering values (safe)
  const digits = useWatch<CodeFields>({ control });

  useEffect(() => {
    const t = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => clearInterval(t);
  }, []);

  // Autofocus the first digit on load
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const onSubmit = async () => {
    setMessage(null);
    // Build code from current values without relying on watched deps
    const vals = getValues();
    const codeString = DIGIT_KEYS.map((k) => vals[k] ?? '').join('');
    await new Promise((r) => setTimeout(r, 800));
    if (/^\d{6}$/.test(codeString)) {
      setMessage('Code verified ✔');
    } else {
      setMessage('Invalid code. Please enter all 6 digits.');
    }
  };

  const handleDigitChange = useCallback(
    (index: number, value: string) => {
      const v = value.replace(/[^0-9]/g, '').slice(0, 1);
      const key: DigitKey = DIGIT_KEYS[index];
      setValue(key, v, { shouldValidate: false });
      if (v && index < 5) inputsRef.current[index + 1]?.focus();
    },
    [setValue]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        const key: DigitKey = DIGIT_KEYS[index];
        const currentVal = getValues(key) ?? '';
        if (!currentVal && index > 0) inputsRef.current[index - 1]?.focus();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputsRef.current[index - 1]?.focus();
        e.preventDefault();
      } else if (e.key === 'ArrowRight' && index < 5) {
        inputsRef.current[index + 1]?.focus();
        e.preventDefault();
      }
    },
    [getValues]
  );

  // Handle paste event to fill all digits
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const text = e.clipboardData.getData('text').replace(/\s+/g, '');
      if (/^\d{6}$/.test(text)) {
        e.preventDefault();
        for (let i = 0; i < 6; i++) {
          const key: DigitKey = DIGIT_KEYS[i];
          setValue(key, text[i], { shouldValidate: false });
        }
        inputsRef.current[5]?.focus();
      }
    },
    [setValue]
  );

  // Paste from clipboard functionality
  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = (await navigator.clipboard.readText()).replace(/\s+/g, '');
      if (/^\d{6}$/.test(text)) {
        for (let i = 0; i < 6; i++) {
          const key: DigitKey = DIGIT_KEYS[i];
          setValue(key, text[i], { shouldValidate: false });
        }
        inputsRef.current[5]?.focus();
        setMessage('Code pasted from clipboard');
      } else {
        setMessage('Clipboard does not contain a 6-digit code');
      }
    } catch {
      setMessage('Could not read clipboard. Grant permission and try again.');
    }
  }, [setValue]);

  return (
    <main className="mx-auto max-w-md p-4 sm:max-w-lg md:max-w-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900"
      >
        <h1 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Verify code
        </h1>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Enter the 6-digit code sent to your email.
        </p>

        <div className="grid grid-cols-6 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              ref={(el: HTMLInputElement | null) => {
                inputsRef.current[i] = el;
              }}
              inputMode="numeric"
              maxLength={1}
              value={digits[DIGIT_KEYS[i] as DigitKey] ?? ''}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="h-12 w-full rounded-md border border-gray-300 bg-white text-center text-lg font-medium shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {message && (
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              reset();
              setMessage(null);
            }}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800"
          >
            Clear
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={pasteFromClipboard}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800"
            >
              Paste code
            </button>
            <button
              type="button"
              disabled={secondsLeft > 0}
              onClick={() => setSecondsLeft(60)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-60 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800"
            >
              Resend code
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {secondsLeft > 0
                ? `You can resend in ${secondsLeft}s`
                : 'You can resend now'}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-60"
          >
            {isSubmitting ? 'Verifying…' : 'Verify'}
          </button>
        </div>
      </form>
    </main>
  );
}
