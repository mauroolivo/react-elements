import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export const ArticleSchema = z.object({
  content: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
  createdAt: z.instanceof(Timestamp),
  validFrom: z.instanceof(Timestamp),
  validUntil: z.instanceof(Timestamp),
});

export type Article = z.infer<typeof ArticleSchema>;

export const ArticleInputSchema = z
  .object({
    content: z.string().trim().min(1, {
      message: "Content cannot be empty",
    }),
    tags: z.preprocess(
      (arg) => {
        if (typeof arg === "string") {
          const s = arg.trim();
          if (s === "") {
            return [];
          }
          return s
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        }
        return arg;
      },
      z.array(z.string()).min(1, {
        message: "At least one tag is required",
      }),
    ),
    title: z.string().trim().min(1, {
      message: "Title cannot be empty",
    }),
    // createdAt may be the server timestamp sentinel when creating a document
    createdAt: z.unknown(),
    // Accept strings from the form and convert to Firestore Timestamp instances
    validFrom: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        const d = new Date(arg as string);
        if (Number.isNaN(d.getTime())) return arg;
        return Timestamp.fromDate(d);
      }
      return arg;
    }, z.instanceof(Timestamp)),
    validUntil: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        const d = new Date(arg as string);
        if (Number.isNaN(d.getTime())) return arg;
        return Timestamp.fromDate(d);
      }
      return arg;
    }, z.instanceof(Timestamp)),
  })
  .superRefine((data, ctx) => {
    // both fields should be Firestore Timestamps after preprocessing
    const validFrom = data.validFrom as unknown as Timestamp | undefined;
    const validUntil = data.validUntil as unknown as Timestamp | undefined;
    if (!validFrom || !(validFrom instanceof Timestamp)) {
      ctx.addIssue({
        code: "custom",
        path: ["validFrom"],
        message: "validFrom must be a valid date",
      });
      return;
    }
    if (!validUntil || !(validUntil instanceof Timestamp)) {
      ctx.addIssue({
        code: "custom",
        path: ["validUntil"],
        message: "validUntil must be a valid date",
      });
      return;
    }
    if (validUntil.toMillis() < validFrom.toMillis()) {
      ctx.addIssue({
        code: "custom",
        path: ["validUntil", "validFrom"],
        message: "validUntil must be greater than or equal to validFrom",
      });
    }
  });

export type ArticleInput = z.infer<typeof ArticleInputSchema>;
