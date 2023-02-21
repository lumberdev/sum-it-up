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
  )} ${wordLimit} word length summary summarizing the text%%"Array of Key Points Separated by '|'"%%1 - 2 word string%%String%%number from 1 through 10, 10 is most trustworthy`;
}

export function generatePromptSongSSE(text: string | string[], wordLimit: number) {
  return `{${text}}
  ${modifier(
    wordLimit,
  )} meaning of the lyrics above formatted as a csv with "%%" as the delimiter. Formatted like this:\n\n
  meaning%%mood%%color
  ${modifier(wordLimit)} ${wordLimit} word length summary of the meaning %% 1 - 2 word string %% valid Hexcode
  
  generate:`;
}
// `{${text}}

//   a summary of the text above as a JSON object that looks like this
//   "summary__": "${wordLimit} word string",
//   "keyPoints__": "[Array of Key Points]",
//   "bias__": "1 - 2 word string",
//   "tone__": "String",
//   "trust__": "number from 1 through 10, 10 is most trustworthy"`;

/**
 * Depending on the length of the input, a different description will be generated to influence the summary length and detail
 */
export const modifier = (wordLimit: number) => {
  if (wordLimit < 50) return "an extremely short";
  if (wordLimit < 100) return "a short";
  if (wordLimit < 200) return "a very detailed";
  return "multiple paragraphs of an incredibly long, detailed, and verbose and longwinded text in the style of a new york times article";
};
