import { ChatGPTPromptPropsItem } from "~/types";

export function generateCondensedSummaryPrompt(text: string, wordLimit: number) {
  return `{${text}}

  generate an extremely short summary of up to ${wordLimit} words`;
}

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

export function generateTextSummaryMarkdown(text: string, wordLimit: number): ChatGPTPromptPropsItem[] {
  return [
    {
      role: "system",
      content: `Generate a markdown summary of the following user text content following this format.
    
      ## (Title of summary)
      summary content (${markdownModifier(wordLimit)})
      \n\n
      ### Key Points:
      - key points based on the summary
      \n\n
      #### Analysis:
      The tone of this article is {one word tone}, the bias is {one word}.
      There's a {number between 1 and 10, 10 being the most likely} chance that this content is truthful`,
    },
    {
      role: "user",
      content: `text: {${text}}`,
    },
  ];
}

export function generatePromptSongMarkdown(text: string, wordLimit: number, title?: string): ChatGPTPromptPropsItem[] {
  return [
    {
      role: "system",
      content: `Generate a markdown interpretation of the meaning of the ${
        title ? `song "${title}"` : "content"
      } submitted following this format:
        
        ## ${title ? `(Title of song and artist ${title})` : "Title Evoked by interpretation"}
        
        interpretation of the meaning of the content (${markdownModifier(wordLimit)})

       - Mood evoked by lyrics: {mood}
        `,
    },
    { role: "user", content: text },
  ];
}

function markdownModifier(wordLimit: number) {
  if (wordLimit <= 100) {
    return `generate a short sentence of about ${wordLimit} words in length`;
  }

  if (wordLimit <= 200) {
    return `generate a long comment of about ${wordLimit} words in length`;
  }
  if (wordLimit <= 300) {
    return `generate a rich summary of about ${wordLimit} words in length`;
  }
  if (wordLimit > 300) {
    return `generate a rich New York Times article of ${wordLimit} words in length`;
  }
}
