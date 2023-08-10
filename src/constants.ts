import { ContentType, MarkdownResponse } from "./types";

export const openAiStorageKey = "open_ai_client_key";

export const initTextMappedPoints = {
  markdown: "",
  inputCharacterLength: 0,
  outputCharacterLength: 0,
  title: "",
  dir: "",
  type: "article" as ContentType,
  byline: "",
  content: "",
  url: "",
} as MarkdownResponse;
