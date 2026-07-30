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
): Promise<Prompt | null> => {
  const snapshot = await getDoc(promptDocument(userId, promptId));

  if (!snapshot.exists()) return null;

  return snapshot.data() as Prompt;
};

// ======================================================
// Get All Prompts
// ======================================================

const getAll = async (userId: string): Promise<Prompt[]> => {
  const snapshot = await getDocs(promptCollection(userId));

  return snapshot.docs.map((document) => document.data() as Prompt);
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
    updatedAt: serverTimestamp(),
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
    updatedAt: serverTimestamp(),
  });
};

// ======================================================
// Subscribe To Prompts (Realtime)
// ======================================================

const subscribe = (userId: string, callback: (prompts: Prompt[]) => void) => {
  return onSnapshot(promptCollection(userId), (snapshot) => {
    const prompts = snapshot.docs.map((doc) => doc.data() as Prompt);

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
