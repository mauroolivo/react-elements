"use client";

import { insertContactAction } from "./InsertContactAction";
import { startTransition, useActionState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/models/contact";

export function ContactForm() {
  const [{ok, error, errors, formData}, formAction, isPending] = useActionState(insertContactAction, {
    ok: false,
    error: "",
    errors: {
      name: null,
      email: null,
      reason: null,
    },
    formData: new FormData(),
  });
  const {handleSubmit, register, formState: { errors: clientErrors }}  = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      reason: "",
      notes: "",
      ...Object.fromEntries(formData ?? {}),
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  
  const onSubmit = useCallback(
    (data: unknown, event?: React.BaseSyntheticEvent) => {
      startTransition(() => {
        if (event?.target) {
          formAction(new FormData(event.target as HTMLFormElement));
        }
      });
    },
    [formAction]
  );
  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900"
    >
      <h2 className="mb-6 text-xl font-semibold">Contact us</h2>

      <div className="grid grid-cols-1 gap-5">
        <div className="field">
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            defaultValue={(formData.get("name") ?? "") as string}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            placeholder="e.g. Luke Skywalker"
          />
          <FieldError
            clientError={clientErrors.name}
            serverError={errors.name}
            errorId="name-error"
          />
        </div>

        <div className="field">
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your email address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            defaultValue={(formData.get("email") ?? "") as string}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            placeholder="you@example.com"
          />
          <FieldError
            clientError={clientErrors.email}
            serverError={errors.email}
            errorId="email-error"
          />
        </div>

        <div className="field">
          <label
            htmlFor="reason"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Reason you need to contact us
          </label>
          <select
            id="reason"
            {...register("reason")}
            defaultValue={(formData.get("reason") ?? "") as string}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
          >
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
          <FieldError
            clientError={clientErrors.reason}
            serverError={errors.reason}
            errorId="reason-error"
          />
        </div>

        <div className="field">
          <label
            htmlFor="notes"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Additional notes
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            defaultValue={(formData.get("notes") ?? "") as string}
            className="min-h-28 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            placeholder="Tell us more…"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {!ok && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {isPending && (
          <p className="text-sm text-gray-600 dark:text-gray-400">Saving...</p>
        )}
        <button
          type="reset"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800"
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={isPending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

type Err = { message?: string } | undefined | null;
function FieldError({
  clientError,
  serverError,
  errorId,
}: {
  clientError: Err;
  serverError: Err;
  errorId: string;
}) {
  const error = clientError ?? serverError;
  if (!error) {
    return null;
  }
  return (
    <div id={errorId} role="alert">
      {error.message}
    </div>
  );
}
