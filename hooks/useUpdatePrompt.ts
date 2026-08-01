import { useState } from "react";

import { PromptService } from "@/services/prompt.service";

import { UpdatePromptPayload } from "@/types/prompt";

export const useUpdatePrompt = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (
    userId: string,
    promptId: string,
    payload: UpdatePromptPayload,
  ) => {
    setLoading(true);

    try {
      await PromptService.update(userId, promptId, payload);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submit,
  };
};
