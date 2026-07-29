import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import { CreatePromptPayload, Prompt } from "@/types/prompt";

const COLLECTION = "prompts";

const create = async (
  userId: string,
  payload: CreatePromptPayload,
): Promise<string> => {
  const promptRef = doc(collection(db, COLLECTION));

  await setDoc(promptRef, {
    id: promptRef.id,

    ...payload,

    description: payload.description || "",

    createdBy: userId,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return promptRef.id;
};

const update = async (
  promptId: string,
  payload: Partial<CreatePromptPayload>,
) => {
  await updateDoc(doc(db, COLLECTION, promptId), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
};

const remove = async (promptId: string) => {
  await deleteDoc(doc(db, COLLECTION, promptId));
};

const getById = async (promptId: string): Promise<Prompt | null> => {
  const snapshot = await getDoc(doc(db, COLLECTION, promptId));

  if (!snapshot.exists()) return null;

  return snapshot.data() as Prompt;
};

const getAll = async (userId: string): Promise<Prompt[]> => {
  const q = query(collection(db, COLLECTION), where("createdBy", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as Prompt);
};

export const PromptService = {
  create,
  update,
  delete: remove,
  getById,
  getAll,
};
