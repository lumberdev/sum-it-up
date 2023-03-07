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

export type openAiModelRequest = {
  model: string;
  prompt: string;
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
};

export type OpenAiRequestProps = {
  textContent?: string;
  wordLimit: number;
  type: ContentType;
};

export type OpenAiSummarizeProps = {
  text?: string;
  maxToken?: number;
  chunkedTextContent?: Array<string>;
  wordLimit: number;
  type: ContentType;
};
export interface CustomRequest<T> extends NextApiRequest {
  body: T;
}

export enum InputType {
  WEBSITE = "Website",
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

export type SongType = {
  meaning: string;
  mood: string;
  moodColor: string;
};
export interface TextResponse {
  keyPoints: string[];
  summary: string;
  tone: string;
  bias: string;
  trust: number;
  type: ContentType;
}

export interface TextSummaryResponseType extends TextResponse {
  bias: string;
  title: string;
  content: string;
  byline: string | null;
  dir: any; // not sure what this would be
  url: string;
}
export type SongMeaningResponseType = {
  byline: string | null;
  dir: any; // not sure what this would be
  meaning: string;
  content: string;
  mood: string;
  moodColor: string;
  title: string;
  url: string;
  type: ContentType;
};

export type ResponseType = TextSummaryResponseType | SongMeaningResponseType | TextResponse;

export type InputFormSubmissionType = (
  event: React.SyntheticEvent,
  type: ContentType,
  summaryLength: string,
  customLength?: string,
  inputUrl?: string,
  text?: string,
  songInfo?: string,
) => Promise<void>;

export type SSEOptionTypes = {
  headers: Object;
  method: string;
  payload: string;
};
