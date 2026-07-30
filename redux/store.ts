import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import authReducer from "./features/auth/authSlice";
import promptReducer from "./features/prompt/promptSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    prompt: promptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
