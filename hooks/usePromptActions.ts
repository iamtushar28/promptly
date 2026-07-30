"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { PromptService } from "@/services/prompt.service";

export const usePromptActions = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [copied, setCopied] = useState(false);

  const toggleFavourite = async (promptId: string) => {
    if (!user) return;

    try {
      await PromptService.toggleFavourite(user.uid, promptId);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePinned = async (promptId: string) => {
    if (!user) return;

    try {
      await PromptService.togglePinned(user.uid, promptId);
    } catch (error) {
      console.error(error);
    }
  };

  const copyPrompt = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    copied,
    copyPrompt,
    toggleFavourite,
    togglePinned,
  };
};
