import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { auth } from "./config";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const logoutUser = () => {
  return signOut(auth);
};
