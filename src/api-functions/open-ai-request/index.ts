import { Configuration, OpenAIApi } from "openai";
import {
  generateCondensedSummaryPrompt,
  generatePromptArticle,
  generatePromptSong,
  generatePromptText,
} from "~/utils/generatePrompt";
import { ContentType, DataType, OpenAiRequestProps, OpenAiSummarizeProps, SongType } from "~/types";

function getValidProps(type: ContentType, chunkedTextContent: Array<string>) {
  switch (type) {
    case "text":
    case "song":
    case "article":
      if (!chunkedTextContent || !chunkedTextContent.length) throw new Error("no data provided");
      return chunkedTextContent;

    default:
      throw new Error("invalid type");
  }
}

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const openAICompletion = async (promptText: string, max_tokens: number): Promise<string> => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptText,
    max_tokens,
    temperature: 0,
  });

  if (!completion.data.choices?.[0].text) throw new Error("OpenAI did not produce a response");

  return completion.data.choices?.[0].text;
};

export async function openAiGetUseableTextContent(props: OpenAiSummarizeProps) {
  const content = getValidProps(props.type, props.chunkedTextContent ?? []);
  let textContent = "";
  if (content.length > 1) {
    const promises = content.map(
      async (string) =>
        await openAICompletion(generateCondensedSummaryPrompt(string, props.wordLimit), props.maxToken ?? 50),
    );
    const results = await Promise.allSettled(promises);
    const filteredRejection = results.filter((res) => res.status !== "rejected");

    filteredRejection.forEach((res) => (textContent += res.status === "fulfilled" ? res.value : ""));

    // @ts-ignore
    if (textContent === "") throw new Error(results?.[0]?.reason?.message);
  } else {
    textContent = content[0];
  }
  return textContent;
}

export async function openAIRequest(props: OpenAiRequestProps): Promise<DataType | SongType> {
  if (!configuration.apiKey) {
    throw new Error("OpenAI API key not configured, please follow instructions in README.md");
  }

  const wordLimit = props.wordLimit || 100;
  const textContent = props.textContent;
  if (!textContent) throw new Error("No content provided");
  const promptText =
    props.type === "text"
      ? generatePromptText(textContent, wordLimit)
      : props.type === "article"
      ? generatePromptArticle(textContent, wordLimit)
      : props.type === "song"
      ? generatePromptSong(textContent, wordLimit)
      : "";

  if (!promptText) {
    throw new Error("Prompt is empty");
  }

  try {
    const completionText = await openAICompletion(promptText, 1000);
    let parsedResponseData = {
      meaning: "",
      mood: "",
      moodColor: "",
      keyPoints: [],
      bias: "",
      tone: "",
      summary: "",
      trust: undefined,
    };
    try {
      parsedResponseData = await JSON.parse(completionText as string);
    } catch (error) {
      throw new Error("Invalid JSON response from OpenAi");
    }
    if (props.type === "song") {
      const responseObject = {
        meaning: parsedResponseData?.meaning,
        mood: parsedResponseData?.mood,
        moodColor: parsedResponseData?.moodColor,
      };

      return responseObject;
    }
    const responseObject = {
      keyPoints: parsedResponseData?.keyPoints,
      bias: parsedResponseData?.bias,
      tone: parsedResponseData?.tone,
      summary: parsedResponseData?.summary,
      trust: parsedResponseData?.trust,
    };

    return responseObject;
  } catch (error) {
    if (error) {
      throw error;
    }
    throw new Error("An error occurred during your request.");
  }
}
