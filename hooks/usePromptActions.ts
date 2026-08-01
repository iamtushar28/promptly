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

    try {
      await PromptService.delete(user.uid, promptId);

      if (closeModal) {
        dispatch(closeViewPromptModal());
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Format Created Time
  const formatTimeAgo = (timestamp?: number | string | Date): string => {
    if (!timestamp) return "Just now";

    const created = new Date(timestamp);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    return created.toLocaleDateString();
  };

  return {
    copied,
    copyPrompt,
    toggleFavourite,
    togglePinned,
    deletePrompt,
    formatTimeAgo,
  };
};
