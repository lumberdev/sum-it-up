/**
 * Put reusable types here,
 * probably better to keep React props types
 * in their own file, but do whatever makes sense.
 */

import { NextApiRequest } from "next";

export type DocumentResponseData = {
  url: string;
  title: string;
  byline: string;
  dir: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  siteName: string;
  chunkedTextContent: Array<string>;
};

export type ChatGPTPromptPropsItem = {
  role: "user" | "system";
  content: string;
};

export type openAiModelRequest = {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
  presence_penalty?: number;
};

export type ChatGPTModelRequest = {
  model: string;
  messages: ChatGPTPromptPropsItem[];
  temperature: number;
  max_tokens: number;
  presence_penalty?: number;
};

export type ErrorMessage = {
  message: string;
  code: number;
};

export type RequestBody = {
  url: string;
  text?: string;
  type: ContentType;
  wordLimit: number;
  title?: string;
};

export type OpenAiRequestProps = {
  textContent?: string;
  wordLimit: number;
  type: ContentType;
};

export type OpenAiSummarizeProps = {
  text?: string;
  maxToken?: number;
  url?: string;
  chunkedTextContent?: Array<string>;
  wordLimit: number;
  type: ContentType;
};
export interface CustomRequest<T> extends NextApiRequest {
  body: T;
}

export enum InputType {
  ARTICLE = "Article",
  TEXT = "Text",
  SONG = "Song",
}

export type ResultPageContentType = "summary" | "original";

export type ContentType = "article" | "song" | "text";

export type DataType = {
  keyPoints: string[];
  bias: string;
  tone: string;
  summary: string;
  trust?: number;
};

export type SharedResponse = {
  inputCharacterLength: number;
  outputCharacterLength: number;
  type: ContentType;
};

export type SharedReadability = {
  bias: string;
  title: string;
  content: string;
  byline: string | null;
  dir?: string; // not sure what this would be
  url: string;
};

export type SongType = {
  meaning: string;
  mood: string;
  moodColor: string;
};
export interface TextResponse extends SharedResponse {
  keyPoints: string[];
  summary: string;
  tone: string;
  bias: string;
  trust: number;
}

export interface MarkdownResponse extends SharedResponse, SharedReadability {
  markdown: string;
  model: string;
}

export interface TextSummaryResponseType extends TextResponse, SharedReadability {}
export interface SongMeaningResponseType extends SharedResponse, SongType, SharedReadability {}

export type ResponseType = TextSummaryResponseType | SongMeaningResponseType | TextResponse;

export type InputFormSubmissionType = (
  event: React.SyntheticEvent | Event,
  type: ContentType,
  summaryLength: string,
  customLength?: string,
  inputUrl?: string,
  text?: string,
  songInfo?: string,
) => Promise<void>;

export type SSEOptionTypes = {
  headers: object;
  method: string;
  payload: string;
};
