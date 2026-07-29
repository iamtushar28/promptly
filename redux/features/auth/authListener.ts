import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { store } from "@/redux/store";
import { clearUser, setUser } from "./authSlice";

// ================= Initialize Firebase Auth Listener =================
export const initializeAuth = () => {
  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    // If no user is logged in, clear Redux state
    if (!user) {
      store.dispatch(clearUser());
      return;
    }

    // If user is logged in, store user details in Redux
    store.dispatch(
      setUser({
        uid: user.uid,
        name: user.displayName ?? "",
        email: user.email ?? "",
        photo: user.photoURL ?? "",
      }),
    );
  });
};
