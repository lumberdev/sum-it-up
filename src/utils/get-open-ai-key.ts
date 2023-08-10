import { openAiStorageKey } from "~/constants";

export const getOpenAiKey = () => {
  const apiKey = localStorage.getItem(openAiStorageKey) || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) throw new Error("Missing key");
  return apiKey;
};
