import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PromptUI } from "@/types/prompt-ui";

export type SortType = "newest" | "oldest" | "az" | "za";

export interface PromptState {
  prompts: PromptUI[];

  search: string;

  category: string;

  favouritesOnly: boolean;

  sort: SortType;
}

const initialState: PromptState = {
  prompts: [],

  search: "",

  category: "All",

  favouritesOnly: false,

  sort: "newest",
};

const promptSlice = createSlice({
  name: "prompt",

  initialState,

  reducers: {
    // =====================================================
    // Prompts
    // =====================================================

    setPrompts(state, action: PayloadAction<PromptUI[]>) {
      state.prompts = action.payload;
    },

    // =====================================================
    // Search
    // =====================================================

    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    // =====================================================
    // Category
    // =====================================================

    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },

    // =====================================================
    // Favourite Filter
    // =====================================================

    setFavouriteOnly(state, action: PayloadAction<boolean>) {
      state.favouritesOnly = action.payload;
    },

    // =====================================================
    // Sort
    // =====================================================

    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },

    // =====================================================
    // Reset
    // =====================================================

    resetFilters(state) {
      state.search = "";
      state.category = "All";
      state.favouritesOnly = false;
      state.sort = "newest";
    },
  },
});

export const {
  setPrompts,
  setSearch,
  setCategory,
  setFavouriteOnly,
  setSort,
  resetFilters,
} = promptSlice.actions;

export default promptSlice.reducer;
