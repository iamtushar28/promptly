import { CreatePromptPayload } from "@/types/prompt";

export interface ImportPrompt {
  title?: unknown;
  prompt?: unknown;
  category?: unknown;
  description?: unknown;
  tags?: unknown;
}

export const validatePrompt = (data: ImportPrompt): CreatePromptPayload => {
  if (typeof data.title !== "string" || data.title.trim() === "") {
    throw new Error("Title is required.");
  }

  if (typeof data.prompt !== "string" || data.prompt.trim() === "") {
    throw new Error("Prompt is required.");
  }

  if (typeof data.category !== "string" || data.category.trim() === "") {
    throw new Error("Category is required.");
  }

  if (!Array.isArray(data.tags)) {
    throw new Error("Tags must be an array.");
  }

  const tags = data.tags.filter(
    (tag): tag is string => typeof tag === "string" && tag.trim() !== "",
  );

  if (tags.length === 0) {
    throw new Error("At least one tag is required.");
  }

  return {
    title: data.title.trim(),
    prompt: data.prompt.trim(),
    category: data.category.trim(),
    description: typeof data.description === "string" ? data.description : "",
    tags,
  };
};
