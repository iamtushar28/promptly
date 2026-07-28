import { createSlice } from "@reduxjs/toolkit";

/* ==========================================================
   Modal State Interface
========================================================== */
interface ModalState {
  /* Controls Add Prompt Modal */
  isAddPromptOpen: boolean;

  /* Controls View Prompt Modal */
  isViewPromptOpen: boolean;
}

/* ==========================================================
   Initial State
========================================================== */
const initialState: ModalState = {
  isAddPromptOpen: false,
  isViewPromptOpen: false,
};

/* ==========================================================
   Modal Slice
========================================================== */
const modalSlice = createSlice({
  name: "modal",

  initialState,

  reducers: {
    /* ================= Add Prompt Modal ================= */

    // Open Add Prompt Modal
    openAddPromptModal: (state) => {
      state.isAddPromptOpen = true;
    },

    // Close Add Prompt Modal
    closeAddPromptModal: (state) => {
      state.isAddPromptOpen = false;
    },

    // Toggle Add Prompt Modal
    toggleAddPromptModal: (state) => {
      state.isAddPromptOpen = !state.isAddPromptOpen;
    },

    /* ================= View Prompt Modal ================= */

    // Open View Prompt Modal
    openViewPromptModal: (state) => {
      state.isViewPromptOpen = true;
    },

    // Close View Prompt Modal
    closeViewPromptModal: (state) => {
      state.isViewPromptOpen = false;
    },

    // Toggle View Prompt Modal
    toggleViewPromptModal: (state) => {
      state.isViewPromptOpen = !state.isViewPromptOpen;
    },

    /* ================= Utility ================= */

    // Close all modals at once
    closeAllModals: (state) => {
      state.isAddPromptOpen = false;
      state.isViewPromptOpen = false;
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
