import { Configuration, OpenAIApi } from "openai";
import {
  generateCondensedSummaryPromptObjectArray,
  generatePromptSongSSEObjectArray,
  generatePromptTextSSEObjectArray,
  generateInsufficientLengthErrorPromptObjectArray,
} from "~/utils/generatePrompt";
import {
  ChatGPTPromptPropsItem,
  ContentType,
  DataType,
  OpenAiRequestProps,
  OpenAiSummarizeProps,
  SongType,
} from "~/types";

async function getValidProps(type: ContentType, chunkedTextContent: Array<string>, url?: string) {
  switch (type) {
    case "text":
    case "song":
      if (!chunkedTextContent || !chunkedTextContent.length) throw new Error("no data provided");
      return chunkedTextContent;
    case "article":
      if (!chunkedTextContent || !chunkedTextContent.length) throw new Error("no data provided");
      if (chunkedTextContent[0].split(" ").length < 200) {
        let errorMessage =
          "The content of the article you are trying to summarize is too short. Please try summarizing using a different URL.";
        if (url) {
          errorMessage = await getInsufficientLengthErrorMessage(url);
        }

        const error = new Error(`${errorMessage}`);
        error.name = "insufficient length";
        throw error;
      }
      return chunkedTextContent;

    default:
      throw new Error("invalid type");
  }
}

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const openAICompletion = async (promptObject: ChatGPTPromptPropsItem[], max_tokens: number): Promise<string> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: promptObject,
    max_tokens,
  });

  if (!completion.data.choices?.[0]?.message?.content) throw new Error("OpenAI did not produce a response");

  return completion.data.choices?.[0]?.message?.content;
};

export async function getInsufficientLengthErrorMessage(url: string) {
  const errorMessage = await openAICompletion(generateInsufficientLengthErrorPromptObjectArray(url, 50), 50);
  return errorMessage;
}

export async function openAiGetUseableTextContent(props: OpenAiSummarizeProps) {
  const content = await getValidProps(props.type, props.chunkedTextContent ?? [], props.url);
  let textContent = "";
  if (content.length > 1) {
    const promises = content.map(
      async (string) =>
        await openAICompletion(
          generateCondensedSummaryPromptObjectArray(string, props.wordLimit),
          props.maxToken ?? 50,
        ),
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
  const promptObject =
    props.type === "text" || props.type === "article"
      ? generatePromptTextSSEObjectArray(textContent, wordLimit)
      : props.type === "song"
      ? generatePromptSongSSEObjectArray(textContent, wordLimit)
      : "";

  if (!promptObject) {
    throw new Error("Prompt is empty");
  }

  try {
    const completionText = await openAICompletion(promptObject, 1000);
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
