import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ================= User Interface =================
export interface UserState {
  uid: string;
  name: string;
  email: string;
  photo: string;
}

// ================= Auth State Interface =================
interface AuthState {
  user: UserState | null;
  loading: boolean;
}

// ================= Initial State =================
const initialState: AuthState = {
  user: null,
  loading: true,
};

// ================= Auth Slice =================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Store authenticated user in Redux
    setUser(state, action: PayloadAction<UserState | null>) {
      state.user = action.payload;
      state.loading = false;
    },

    // Remove user from Redux on logout
    clearUser(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

// ================= Export Actions =================
export const { setUser, clearUser } = authSlice.actions;

// ================= Export Reducer =================
export default authSlice.reducer;
