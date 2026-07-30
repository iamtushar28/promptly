import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { PromptUI } from "@/types/prompt-ui";

// ======================================================
// Base Selectors
// ======================================================

const selectPromptState = (state: RootState) => state.prompt;

export const selectAllPrompts = (state: RootState) => state.prompt.prompts;

// ======================================================
// Filtered Prompts
// ======================================================

export const selectFilteredPrompts = createSelector(
  [selectPromptState],
  (promptState): PromptUI[] => {
    const { prompts, search, category, favouritesOnly, sort } = promptState;

    let result = [...prompts];

    // ===========================================
    // Search (Title + Prompt)
    // ===========================================

    if (search.trim()) {
      const keyword = search.trim().toLowerCase();

      result = result.filter((prompt) => {
        return (
          prompt.title.toLowerCase().includes(keyword) ||
          prompt.prompt.toLowerCase().includes(keyword)
        );
      });
    }

    // ===========================================
    // Category
    // ===========================================

    if (category !== "All") {
      result = result.filter((prompt) => prompt.category === category);
    }

    // ===========================================
    // Favourite
    // ===========================================

    if (favouritesOnly) {
      result = result.filter((prompt) => prompt.favourite);
    }

    // ===========================================
    // Sort (Pinned always first)
    // ===========================================

    result.sort((a, b) => {
      // ----------------------------
      // Pinned First
      // ----------------------------

      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }

      switch (sort) {
        case "newest":
          return b.updatedAt - a.updatedAt;

        case "oldest":
          return a.updatedAt - b.updatedAt;

        case "az":
          return a.title.localeCompare(b.title);

        case "za":
          return b.title.localeCompare(a.title);

        default:
          return 0;
      }
    });

    return result;
  },
);

// ======================================================
// Count
// ======================================================

export const selectPromptCount = createSelector(
  [selectFilteredPrompts],
  (prompts) => prompts.length,
);

// ======================================================
// Categories
// ======================================================

export const categories = [
  "All",
  "Coding",
  "Marketing",
  "Content Writing",
  "Email",
  "Resume",
  "SQL",
  "Design",
  "Social Media",
  "Productivity",
  "Others",
] as const;
