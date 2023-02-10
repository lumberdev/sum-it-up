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

export function generateCondensedSummaryPrompt(text: string) {
  return `{${text}}

  generate an extremely short summary of up to 20 words`;
}
