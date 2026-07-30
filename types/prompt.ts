import { Timestamp } from "firebase/firestore";

export interface Prompt {
  id: string;

  title: string;
  prompt: string;

  description?: string;

  category: string;

  tags: string[];

  favourite: boolean;
  pinned: boolean;

  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type CreatePromptPayload = Omit<
  Prompt,
  "id" | "favourite" | "pinned" | "createdAt" | "updatedAt"
>;

export type UpdatePromptPayload = Partial<CreatePromptPayload>;
