import { Timestamp } from "firebase/firestore";

export interface Prompt {
  id: string;

  title: string;
  prompt: string;

  description?: string;

  category: string;

  tags: string[];

  createdBy: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreatePromptPayload {
  title: string;
  prompt: string;

  description?: string;

  category: string;

  tags: string[];
}
