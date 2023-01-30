export function generatePrompt(article: string | string[], wordLimit: number) {
  return `you are a chatbot created with the sole intent to return a summary of text content given a json object.
  OUTPUT a new object summarizing the key points of the "textContent" key in a JSON object that looks like this:
  "{
  keyPoints: [Array of Key Points],
  bias: String,
  tone: String,
  summary: String with an exact word limit of ${wordLimit} words,
  trust: rating from 1 to 10, 10 being highest
  }
  "
  Using this JSON object as the INPUT:
  "{
    title: '',
    byline: null,
    dir: null,
    lang: 'en',
    textContent: ${article}
  }”`;
}
