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
  A summary of the text above formatted as a csv with "%%" as the delimiter. Formatted like this:
  summary%%keypoints%%bias%%tone%%trust
  ${wordLimit} word length summary%%"Array of Key Points Separated by '|'"%%1 - 2 word string%%String%%number from 1 through 10, 10 is most trustworthy`;
}

export function generatePromptSongSSE(text: string | string[], wordLimit: number) {
  return `{${text}}
  a summary of the lyrics above formatted as a csv with "%%" as the delimiter. Formatted like this:
  meaning%%mood%%moodColor
  ${wordLimit} word length summary meaning%%1 - 2 word string%%valid Hexcode string`;
}
// `{${text}}

//   a summary of the text above as a JSON object that looks like this
//   "summary__": "${wordLimit} word string",
//   "keyPoints__": "[Array of Key Points]",
//   "bias__": "1 - 2 word string",
//   "tone__": "String",
//   "trust__": "number from 1 through 10, 10 is most trustworthy"`;
