export const PROMPT_CATEGORIES = [
  "All",
  "Coding",
  "Marketing",
  "Content Writing",
  "Email",
  "Resume",
  "SQL",
  "Design",
  "Social Media",
  "Productivity",
  "Others",
] as const;

export const SORT_OPTIONS = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "A-Z",
    value: "az",
  },
  {
    label: "Z-A",
    value: "za",
  },
] as const;
