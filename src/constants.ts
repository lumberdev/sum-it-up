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

export const DEFAULT_CHUNK_SIZE = 10000;
export const DEFAULT_TOKEN_SIZE = 50;
export const MAX_TOKEN_SIZE = 15600;
export const MAX_WORD_LENGTH = 15000;
export const DEFAULT_GPT_MODEL = "gpt-3.5-turbo-0125";
