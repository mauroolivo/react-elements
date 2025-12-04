"use client";

import { insertContactAction } from "./InsertContactAction";

export function ContactForm() {
  return (
    <form
      action={insertContactAction}
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
            name="name"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            placeholder="e.g. Luke Skywalker"
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
            name="email"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            placeholder="you@example.com"
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
            name="reason"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
          >
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
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
            name="notes"
            className="min-h-28 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            placeholder="Tell us more…"
          />
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
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
