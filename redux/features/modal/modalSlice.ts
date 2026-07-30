import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ==========================================================
   Modal State Interface
========================================================== */
interface ModalState {
  /* Controls Add Prompt Modal */
  isAddPromptOpen: boolean;

  /* Controls View Prompt Modal */
  isViewPromptOpen: boolean;

  /* Currently selected prompt id */
  selectedPromptId: string | null;
}

/* ==========================================================
   Initial State
========================================================== */
const initialState: ModalState = {
  isAddPromptOpen: false,
  isViewPromptOpen: false,
  selectedPromptId: null,
};

/* ==========================================================
   Modal Slice
========================================================== */
const modalSlice = createSlice({
  name: "modal",

  initialState,

  reducers: {
    /* ================= Add Prompt Modal ================= */

    openAddPromptModal: (state) => {
      state.isAddPromptOpen = true;
    },

    closeAddPromptModal: (state) => {
      state.isAddPromptOpen = false;
    },

    toggleAddPromptModal: (state) => {
      state.isAddPromptOpen = !state.isAddPromptOpen;
    },

    /* ================= View Prompt Modal ================= */

    openViewPromptModal: (state, action: PayloadAction<string>) => {
      state.isViewPromptOpen = true;
      state.selectedPromptId = action.payload;
    },

    closeViewPromptModal: (state) => {
      state.isViewPromptOpen = false;
      state.selectedPromptId = null;
    },

    toggleViewPromptModal: (state) => {
      state.isViewPromptOpen = !state.isViewPromptOpen;

      if (!state.isViewPromptOpen) {
        state.selectedPromptId = null;
      }
    },

    /* ================= Utility ================= */

    closeAllModals: (state) => {
      state.isAddPromptOpen = false;
      state.isViewPromptOpen = false;
      state.selectedPromptId = null;
    },
  },
});

/* ==========================================================
   Export Actions
========================================================== */

export const {
  openAddPromptModal,
  closeAddPromptModal,
  toggleAddPromptModal,

  openViewPromptModal,
  closeViewPromptModal,
  toggleViewPromptModal,

  closeAllModals,
} = modalSlice.actions;

/* ==========================================================
   Export Reducer
========================================================== */

export default modalSlice.reducer;
