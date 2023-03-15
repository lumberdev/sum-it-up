import { ChatGPTPromptPropsItem } from "~/types";

export function generatePromptArticle(article: string | string[], wordLimit: number) {
  return `{${article}}

  a summary of the text above as a JSON object that looks like this
  "{
  "keyPoints": "[Array of Key Points]",
  "bias": "1 - 2 word string",
  "tone": "String",
  "summary": "${wordLimit} word string",
  "trust": "number from 1 through 10, 10 is most trustworthy"
  }"`;
}

export function generatePromptSong(songLyrics: string | string[], wordLimit: number) {
  return `{${songLyrics}}

  a summary of the lyrics above as a JSON object that looks like this
  "{
  "meaning": "${wordLimit} word string",
  "mood": "1 - 2 word string",
  "moodColor": "valid color hexcode value"
  }"`;
}

/**
   "{
  keyPoints: [Array of Key Points],
  bias: String,
  tone: String,
  summary: String with an exact word limit of ${wordLimit} words,
  trust: rating from 1 to 10, 10 being highest
  }
  "
 */

export function generatePromptText(text: string | string[], wordLimit: number) {
  return `{${text}}

  a summary of the text above as a JSON object that looks like this
  "{
  "keyPoints": "[Array of Key Points]",
  "bias": "1 - 2 word string",
  "tone": "String",
  "summary": "${wordLimit} word string",
  "trust": "number from 1 through 10, 10 is most trustworthy"
  }"`;
}

export function generateCondensedSummaryPrompt(text: string, wordLimit: number) {
  return `{${text}}

  generate an extremely short summary of up to ${wordLimit} words`;
}

export function generatePromptTextSSE(text: string | string[], wordLimit: number) {
  return `{${text}}
  ${modifier(
    wordLimit,
  )} summary of the text above formatted as a csv with "%%" as the delimiter. Formatted like this:\n\n
  summary%%keypoints%%bias%%tone%%trust
  ${modifier(
    wordLimit,
  )} ${wordLimit} word length summary summarizing the text%%"Array of Key Points Separated by '|'"%%1 - 2 word string%%String%%number from 1 through 10, 10 is most trustworthy.
  
  generate:`;
}

// export function generatePromptSongSSE(text: string | string[], wordLimit: number) {
//   return `{${text}}
//   ${modifier(
//     wordLimit,
//   )} meaning of the lyrics above formatted as a csv with "%%" as the delimiter. Formatted like this:\n\n
//   meaning%%mood%%color
//   ${modifier(wordLimit)} ${wordLimit} word length summary of the meaning %% 1 - 2 word string %% valid Hexcode.

//   generate:`;
// }

export function generatePromptSongSSE(text: string | string[], wordLimit: number) {
  return `{${text}}
  ${modifier(wordLimit)} meaning of the lyrics above 
  ${modifier(wordLimit)} ${wordLimit} word length summary of the meaning.
  
  generate:`;
}

/**
 * Depending on the length of the input, a different description will be generated to influence the summary length and detail
 */
export const modifier = (wordLimit: number) => {
  if (wordLimit < 50) return "an extremely short";
  if (wordLimit < 100) return "a short";
  if (wordLimit < 200) return "a very detailed";
  return "multiple paragraphs of an incredibly long, detailed, and verbose and long-winded text in the style of a new york times article";
};

/* ------ Chat GPT Prompts below ------ */

// As of March 8, 2023, chatGPT api docs recommends setting the system role to user to set more explicit instructions as sometimes the system prompt is ignored by some models

// https://platform.openai.com/docs/guides/chat/instructing-chat-models

export function generateCondensedSummaryPromptObjectArray(text: string, wordLimit: number): ChatGPTPromptPropsItem[] {
  return [
    {
      role: "system",
      content: `generate an extremely short summary of up to ${wordLimit} words based on the text`,
    },
    { role: "user", content: text },
  ];
}

export function generatePromptSongSSEObjectArray(text: string, wordLimit: number): ChatGPTPromptPropsItem[] {
  return [
    {
      role: "system",
      content: `${modifier(
        wordLimit,
      )} ${wordLimit} word length interpretation of the meaning of the song lyrics submitted.`,
    },
    { role: "user", content: text },
  ];
}

export function generatePromptTextSSEObjectArray(text: string, wordLimit: number): ChatGPTPromptPropsItem[] {
  return [
    {
      role: "system",
      content: `I want you to act as a new york times article author. Given the user text contained in curly braces respond with a short ${wordLimit} word article about the text. First generate the article summary, then generate a list of key points with "*>" as bullet the  under the key "KEYS", then generate a 1 word string of the bias under the key "BIAS", then generate a 1 word string of the tone under the key "TONE", then generate a 1 number verdict of trust out of 10 inclusive (10 is highest trust) under the key "TRUST"`,
    },
    {
      role: "user",
      content: `text: {${text}}`,
    },
  ];
}

export function generateInsufficientLengthErrorPromptObjectArray(
  url: string,
  wordLimit: number,
): ChatGPTPromptPropsItem[] {
  return [
    {
      role: "system",
      content: `If the url points to an article and there is sufficient information available, generate a brief summary of the article consisting of two sentences, with the 1st sentence limited to a maximum of ${wordLimit} words. The 1st sentence should begin with "The article discusses," and the 2nd sentence should say: "The content of the article you are trying to summarize is too short. Please try summarizing using different URL." If there isn't sufficient information available, simply return the second sentence of the summary.`,
    },
    {
      role: "user",
      content: `url: {${url}}`,
    },
  ];
}
