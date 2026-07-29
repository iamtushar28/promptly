import { z } from "zod";

export const createPromptSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(80, "Title cannot exceed 80 characters."),

  prompt: z.string().trim().min(20, "Prompt must be at least 20 characters."),

  description: z.string().optional(),

  category: z.string().min(1, "Please select a category."),

  tags: z.string().optional(),
});

export type CreatePromptForm = z.infer<typeof createPromptSchema>;
