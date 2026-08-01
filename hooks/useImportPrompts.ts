import { useState } from "react";

import { PromptService } from "@/services/prompt.service";
import { validatePrompt } from "@/types/importPrompt";

export const useImportPrompts = () => {
  const [loading, setLoading] = useState(false);

  const importPrompts = async (userId: string, file: File) => {
    setLoading(true);

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      if (!Array.isArray(json.prompts)) {
        throw new Error("Invalid import file.");
      }

      let success = 0;

      const errors: string[] = [];

      for (let i = 0; i < json.prompts.length; i++) {
        try {
          const payload = validatePrompt(json.prompts[i]);

          await PromptService.create(userId, payload);

          success++;
        } catch (error) {
          errors.push(
            `Row ${i + 1}: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          );
        }
      }

      return {
        success,
        failed: errors.length,
        errors,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    importPrompts,
  };
};
