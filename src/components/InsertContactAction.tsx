"use server";

import { Contact } from "@/data/schema";
import { insertContact } from "@/query/query";
import { redirect } from "next/navigation";

export async function insertContactAction(formData: FormData) {
  const { name, email, reason, notes } = Object.fromEntries(
    formData
  ) as Contact;
  const res = await insertContact({ name, email, reason, notes });
  if (res.ok) {
    redirect(`/contact/thanks/?name=${encodeURIComponent(name)}`);
  }
}
