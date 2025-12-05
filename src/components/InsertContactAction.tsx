"use server";
import { z } from "zod";
import { contactSchema } from "@/models/contact";
import { insertContact } from "@/query/query";
import { redirect } from "next/navigation";

type Err = {
  message: string;
};
type FieldErrors = {
  name: Err | null;
  email: Err | null;
  reason: Err | null;
};
type ActionState = {
  ok: boolean;
  error: string;
  formData: FormData;
  errors: FieldErrors;
};

export async function insertContactAction(
  previousState: ActionState,
  formData: FormData
) {
  const parsedResult = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsedResult.success) {
    return {
      ok: false,
      error: "Unable to save - invalid field values",
      errors: formatZodErrors(parsedResult.error),
      formData,
    };
  }
  const { name, email, reason, notes } = parsedResult.data;
  let ok = true;
  let error = "";
  try {
    await insertContact({ name, email, reason, notes });
  } catch {
    ok = false;
    error = "Problem saving form";
  }

  if (ok) {
    redirect(`/contact/thanks/?name=${encodeURIComponent(name)}`);
  }
  return {
    ok,
    error,
    formData,
    errors: {
      name: null,
      email: null,
      reason: null,
    },
  };
}

function formatZodErrors(error: z.ZodError) {
  const formattedErrors: FieldErrors = {
    name: null,
    email: null,
    reason: null,
  };
  for (const [key, value] of Object.entries(error.flatten().fieldErrors)) {
    if (Array.isArray(value)) {
      if (key === "name") {
        formattedErrors.name = {
          message: value[0],
        };
      } else if (key === "email") {
        formattedErrors.email = {
          message: value[0],
        };
      } else if (key === "reason") {
        formattedErrors.reason = {
          message: value[0],
        };
      }
    }
  }
  return formattedErrors;
}
