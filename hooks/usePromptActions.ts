"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeViewPromptModal } from "@/redux/features/modal/modalSlice";
import { RootState } from "@/redux/store";
import { PromptService } from "@/services/prompt.service";

export const usePromptActions = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

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

  const deletePrompt = async (promptId: string, closeModal = false) => {
    if (!user) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this prompt?",
    );

    if (!confirmed) return;

    try {
      await PromptService.delete(user.uid, promptId);

      if (closeModal) {
        dispatch(closeViewPromptModal());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    copied,
    copyPrompt,
    toggleFavourite,
    togglePinned,
    deletePrompt,
  };
};
