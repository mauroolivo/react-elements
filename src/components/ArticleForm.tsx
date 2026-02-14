"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { createArticle } from "@/lib/firebase";
import { serverTimestamp } from "firebase/firestore";
import { type ArticleInput } from "@/models/article";

type Props = {
  onCancelAction: () => void;
  onCreatedAction?: () => Promise<void> | void;
};

type FormValues = {
  title: string;
  content: string;
  tagsInput: string;
  validFrom: string;
  validUntil: string;
};

export default function ArticleForm({
  onCancelAction,
  onCreatedAction,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      content: "",
      tagsInput: "",
      validFrom: "",
      validUntil: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(data: FormValues) {
    setError(null);
    const tags = data.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: ArticleInput = {
      title: data.title.trim(),
      content: data.content.trim(),
      tags,
      createdAt: serverTimestamp(),
      validFrom: data.validFrom,
      validUntil: data.validUntil,
    } as unknown as ArticleInput;

    try {
      await createArticle(payload);
      reset();
      if (onCreatedAction) await onCreatedAction();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="w-full max-w-xl rounded bg-gray-800 p-6">
        <h2 className="text-lg font-semibold">Create Article</h2>

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-gray-300">Title</label>
            <input
              {...register("title")}
              className="mt-1 w-full rounded bg-slate-700 px-3 py-2 text-sm text-slate-100"
            />
            {errors.title && (
              <div className="text-xs text-red-400">{errors.title.message}</div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300">Content</label>
            <textarea
              {...register("content")}
              rows={6}
              className="mt-1 w-full rounded bg-slate-700 px-3 py-2 text-sm text-slate-100"
            />
            {errors.content && (
              <div className="text-xs text-red-400">
                {errors.content.message}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300">
              Tags (comma separated)
            </label>
            <input
              {...register("tagsInput")}
              className="mt-1 w-full rounded bg-slate-700 px-3 py-2 text-sm text-slate-100"
            />
            {errors.tagsInput && (
              <div className="text-xs text-red-400">
                {errors.tagsInput.message}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300">Valid from</label>
            <input
              type="date"
              {...register("validFrom")}
              className="mt-1 w-full rounded bg-slate-700 px-3 py-2 text-sm text-slate-100"
            />
            {errors.validFrom && (
              <div className="text-xs text-red-400">
                {errors.validFrom.message}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300">Valid until</label>
            <input
              type="date"
              {...register("validUntil")}
              className="mt-1 w-full rounded bg-slate-700 px-3 py-2 text-sm text-slate-100"
            />
            {errors.validUntil && (
              <div className="text-xs text-red-400">
                {errors.validUntil.message}
              </div>
            )}
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-green-600 px-3 py-1 text-sm font-medium hover:bg-green-500 disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              className="rounded bg-gray-600 px-3 py-1 text-sm hover:bg-gray-500"
              onClick={onCancelAction}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
