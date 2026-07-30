import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { PromptUI } from "@/types/prompt-ui";

import {
  CreatePromptPayload,
  Prompt,
  UpdatePromptPayload,
} from "@/types/prompt";

const COLLECTION = "prompts";

// ======================================================
// Helpers
// ======================================================

const promptCollection = (userId: string) =>
  collection(db, COLLECTION, userId, "items");

const promptDocument = (userId: string, promptId: string) =>
  doc(db, COLLECTION, userId, "items", promptId);

// ======================================================
// Mapper
// ======================================================

const toPromptUI = (prompt: Prompt): PromptUI => ({
  ...prompt,

  createdAt: prompt.createdAt?.toMillis() ?? 0,

  updatedAt: prompt.updatedAt?.toMillis() ?? 0,
});

// ======================================================
// Create Prompt
// ======================================================

const create = async (
  userId: string,
  payload: CreatePromptPayload,
): Promise<string> => {
  const promptRef = doc(promptCollection(userId));

  await setDoc(promptRef, {
    id: promptRef.id,

    ...payload,

    description: payload.description ?? "",

    favourite: false,
    pinned: false,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return promptRef.id;
};

// ======================================================
// Update Prompt
// ======================================================

const update = async (
  userId: string,
  promptId: string,
  payload: UpdatePromptPayload,
): Promise<void> => {
  await updateDoc(promptDocument(userId, promptId), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
};

// ======================================================
// Delete Prompt
// ======================================================

const remove = async (userId: string, promptId: string): Promise<void> => {
  await deleteDoc(promptDocument(userId, promptId));
};

// ======================================================
// Get Prompt By Id
// ======================================================

const getById = async (
  userId: string,
  promptId: string,
): Promise<PromptUI | null> => {
  const snapshot = await getDoc(promptDocument(userId, promptId));

  if (!snapshot.exists()) return null;

  return toPromptUI(snapshot.data() as Prompt);
};

// ======================================================
// Get All Prompts
// ======================================================

const getAll = async (userId: string): Promise<PromptUI[]> => {
  const snapshot = await getDocs(promptCollection(userId));

  return snapshot.docs.map((document) => toPromptUI(document.data() as Prompt));
};

// ======================================================
// Toggle Favourite
// ======================================================

const toggleFavourite = async (
  userId: string,
  promptId: string,
): Promise<void> => {
  const snapshot = await getDoc(promptDocument(userId, promptId));

  if (!snapshot.exists()) return;

  const prompt = snapshot.data() as Prompt;

  await updateDoc(promptDocument(userId, promptId), {
    favourite: !prompt.favourite,
  });
};

// ======================================================
// Toggle Pinned
// ======================================================

const togglePinned = async (
  userId: string,
  promptId: string,
): Promise<void> => {
  const snapshot = await getDoc(promptDocument(userId, promptId));

  if (!snapshot.exists()) return;

  const prompt = snapshot.data() as Prompt;

  await updateDoc(promptDocument(userId, promptId), {
    pinned: !prompt.pinned,
  });
};

// ======================================================
// Subscribe To Prompts (Realtime)
// ======================================================

const subscribe = (userId: string, callback: (prompts: PromptUI[]) => void) => {
  return onSnapshot(promptCollection(userId), (snapshot) => {
    const prompts = snapshot.docs.map((doc) =>
      toPromptUI(doc.data() as Prompt),
    );

    callback(prompts);
  });
};

export const PromptService = {
  create,
  update,
  delete: remove,
  getById,
  getAll,
  toggleFavourite,
  togglePinned,
  subscribe,
};
