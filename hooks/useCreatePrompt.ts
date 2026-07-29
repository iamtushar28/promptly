import { useState } from "react";

import { PromptService } from "@/services/prompt.service";

import { CreatePromptPayload } from "@/types/prompt";

export const useCreatePrompt = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (userId: string, payload: CreatePromptPayload) => {
    setLoading(true);

    try {
      return await PromptService.create(userId, payload);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submit,
  };
};
