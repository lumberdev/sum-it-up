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

// export type ErrorMessage = {
//   message: string;
// };

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
export interface CustomRequest<T> extends NextApiRequest {
  body: T;
}

export enum InputType {
  WEBSITE = "Website",
  TEXT = "Text",
  SONG = "Song",
}

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
