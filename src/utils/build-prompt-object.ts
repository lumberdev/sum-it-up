import { generatePromptSongMarkdown, generateTextSummaryMarkdown } from "./generatePrompt";

export function buildPromptObject(type: string, textContent: string, wordLimit: number, title: string) {
  if (type === "text" || type === "article") return generateTextSummaryMarkdown(textContent, wordLimit);
  else if (type === "song") return generatePromptSongMarkdown(textContent, wordLimit, title);
  else return [];
}
