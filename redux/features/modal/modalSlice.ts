import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ==========================================================
   Modal State Interface
========================================================== */
interface ModalState {
  /* Controls Add Prompt Modal */
  isAddPromptOpen: boolean;

  /* Controls View Prompt Modal */
  isViewPromptOpen: boolean;

  /* Controls Edit Prompt Modal */
  isEditPromptOpen: boolean;

  /* Currently selected prompt id */
  selectedPromptId: string | null;
}

/* ==========================================================
   Initial State
========================================================== */
const initialState: ModalState = {
  isAddPromptOpen: false,
  isViewPromptOpen: false,
  isEditPromptOpen: false,
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

    /* ================= Edit Prompt Modal ================= */
    openEditPromptModal: (state, action: PayloadAction<string>) => {
      state.isViewPromptOpen = false; // Close View
      state.isAddPromptOpen = false; // Close Add

      state.isEditPromptOpen = true;
      state.selectedPromptId = action.payload;
    },

    closeEditPromptModal: (state) => {
      state.isEditPromptOpen = false;
      state.selectedPromptId = null;
    },

    toggleEditPromptModal: (state) => {
      state.isEditPromptOpen = !state.isEditPromptOpen;

      if (!state.isEditPromptOpen) {
        state.selectedPromptId = null;
      }
    },

    /* ================= Utility ================= */

    closeAllModals: (state) => {
      state.isAddPromptOpen = false;
      state.isViewPromptOpen = false;
      state.isEditPromptOpen = false;
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

  openEditPromptModal,
  closeEditPromptModal,
  toggleEditPromptModal,

  closeAllModals,
} = modalSlice.actions;

/* ==========================================================
   Export Reducer
========================================================== */

export default modalSlice.reducer;
