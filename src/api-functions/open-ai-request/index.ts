import { Configuration, OpenAIApi } from "openai";
import {
  generateCondensedSummaryPromptObjectArray,
  generateInsufficientLengthErrorPromptObjectArray,
} from "~/utils/generatePrompt";
import { ChatGPTPromptPropsItem, ContentType, OpenAiSummarizeProps } from "~/types";
import { getOpenAiKey } from "~/utils/get-open-ai-key";

function checkIfChunkedContentExceedsLimit(chunkedTextContent: Array<string>) {
  const totalWordsOfArticle = chunkedTextContent.flatMap((value) => value.split(" ")).length;
  const max_word_length = 5000;
  if (totalWordsOfArticle > max_word_length) {
    const error = new Error(
      `Error content too long, content exceeds ${max_word_length} words, content length: ${totalWordsOfArticle}`,
    );
    error.name = "Length constraint violation";

    throw error;
  }
}

async function getInsufficientLengthErrorMessage(url: string) {
  const errorMessage = await openAICompletion(generateInsufficientLengthErrorPromptObjectArray(url, 50), 50);
  return errorMessage;
}

async function getValidProps(type: ContentType, chunkedTextContent: Array<string>, url?: string) {
  switch (type) {
    case "text":
    case "song":
      if (!chunkedTextContent || !chunkedTextContent.length) throw new Error("no data provided");
      checkIfChunkedContentExceedsLimit(chunkedTextContent);
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
        error.name = "Length constraint violation";
        throw error;
      }
      checkIfChunkedContentExceedsLimit(chunkedTextContent);
      return chunkedTextContent;

    default:
      throw new Error("invalid type");
  }
}

const configureOpenAi = () => {
  const apiKey = getOpenAiKey();
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);
  return openai;
};

const openAICompletion = async (promptObject: ChatGPTPromptPropsItem[], max_tokens: number): Promise<string> => {
  const openai = configureOpenAi();
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: promptObject,
    max_tokens,
  });

  if (!completion.data.choices?.[0]?.message?.content) throw new Error("OpenAI did not produce a response");

  return completion.data.choices?.[0]?.message?.content;
};

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
