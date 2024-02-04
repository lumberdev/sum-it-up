import {
  generateCondensedSummaryPromptObjectArray,
  generateInsufficientLengthErrorPromptObjectArray,
} from "~/utils/generatePrompt";
import { ChatGPTPromptPropsItem, ContentType, OpenAiSummarizeProps } from "~/types";
import { DEFAULT_GPT_MODEL, DEFAULT_TOKEN_SIZE, MAX_WORD_LENGTH } from "~/constants";

function checkIfChunkedContentExceedsLimit(chunkedTextContent: Array<string>) {
  const totalWordsOfArticle = chunkedTextContent.flatMap((value) => value.split(" ")).length;

  if (totalWordsOfArticle > MAX_WORD_LENGTH) {
    const error = new Error(
      `Error content too long, content exceeds ${MAX_WORD_LENGTH} words, content length: ${totalWordsOfArticle}`,
    );
    error.name = "Length constraint violation";

    throw error;
  }
}

async function getInsufficientLengthErrorMessage(url: string) {
  const errorMessage = await openAICompletion(
    generateInsufficientLengthErrorPromptObjectArray(url, DEFAULT_TOKEN_SIZE),
    DEFAULT_TOKEN_SIZE,
  );
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

const openAICompletion = async (promptObject: ChatGPTPromptPropsItem[], maxTokens: number): Promise<string> => {
  const body = { model: DEFAULT_GPT_MODEL, messages: promptObject, max_tokens: maxTokens };
  const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY}/openai/v1/chat/completions`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const completion = await res.json();

  if (!completion.choices?.[0]?.message?.content) throw new Error("OpenAI did not produce a response");

  return completion.choices?.[0]?.message?.content;
};

export async function openAiGetUseableTextContent(props: OpenAiSummarizeProps) {
  const content = await getValidProps(props.type, props.chunkedTextContent ?? [], props.url);
  let textContent = "";
  if (content.length > 1) {
    const promises = content.map(
      async (string) =>
        await openAICompletion(
          generateCondensedSummaryPromptObjectArray(string, props.wordLimit),
          props.maxToken ?? DEFAULT_TOKEN_SIZE,
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
