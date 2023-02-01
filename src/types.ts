/**
 * Put reusable types here,
 * probably better to keep React props types
 * in their own file, but do whatever makes sense.
 */

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
