export interface PromptUI {
  id: string;

  title: string;
  prompt: string;

  description?: string;

  category: string;

  tags: string[];

  favourite: boolean;
  pinned: boolean;

  createdAt: number;
  updatedAt: number;
}
