import { useEffect, useState } from "react";
import { openAiGetUseableTextContent } from "~/api-functions/open-ai-request";
import { fetchArticleData } from "~/query/fetch-article-data";
import {
  openAiModelRequest,
  OpenAiRequestProps,
  OpenAiSummarizeProps,
  RequestBody,
  ResponseType,
  TextSummaryResponseType,
} from "~/types";
import {
  generatePromptArticle,
  generatePromptSong,
  generatePromptText,
  generatePromptTextSSE,
} from "~/utils/generatePrompt";
import { callWithText, callWithUrl, getSummaryFromUrl } from "~/utils/open-ai-fetch";
import { fetchServerSent } from "~/utils/sse-fetch";

/**
 * A hook that returns streamed text response from openAI
 */
const useOpenAiSSEResponse = () => {
  const [streamedResult, setStreamedResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<RequestBody>();
  const initMappedPoints = {
    keyPoints: [""],
    bias: "",
    summary: "",
    tone: "",
    trust: 0,
    type: data?.type ?? "article",
    byline: "",
    title: "",
    dir: "",
    url: "",
  };
  const [mappedPoints, setMappedPoints] = useState<TextSummaryResponseType>({ ...initMappedPoints });
  const [error, setError] = useState<boolean>();

  const mutate = (props: RequestBody) => {
    setData(props);
  };

  // get URL readability

  useEffect(() => {
    console.log(data);
    setStreamedResult("");
    if (!data || !Object.keys(data).length) return;
    const { wordLimit, type, url, text } = data;
    const streamContent = async () => {
      const buildContentToStream = async () => {
        let textContent = "";
        if (type === "article" || type === "song") {
          const json = await fetchArticleData(url, 500);
          const body = await getSummaryFromUrl(type, json.chunkedTextContent);
          textContent = body;
        } else {
          textContent = text ?? "";
        }
        return textContent;
      };
      const textContent = await buildContentToStream();
      console.log(textContent);
      const promptText =
        type === "text"
          ? generatePromptTextSSE(textContent, wordLimit)
          : type === "article"
          ? generatePromptTextSSE(textContent, wordLimit)
          : type === "song"
          ? generatePromptText(textContent, wordLimit)
          : "";

      const openAiPayload: openAiModelRequest = {
        model: "text-davinci-003",
        prompt: promptText,
        max_tokens: 1000,
        temperature: 0,
      };
      fetchServerSent(
        "https://api.openai.com/v1/completions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPENAI_API_KEY,
          },
          method: "POST",
          payload: JSON.stringify({
            ...openAiPayload,
            stream: true,
          }),
        },
        (payload: string) => {
          if ((payload as string) === "[DONE]") {
            setIsLoading(false);
            return;
          }
          const text = JSON.parse(payload).choices?.[0]?.text;

          console.log(payload);

          setStreamedResult((state) => {
            const array = `${state}${text}`.split("%%");
            setMappedPoints((state) => {
              state.summary = array?.[0];
              state.bias = array?.[1];
              state.keyPoints = array?.[2]?.split("|");
              state.trust = parseInt(array?.[3]);
              return state;
            });

            return `${state}${text}`;
          });
        },
        (err) => {
          setError(true);
        },
      );
    };

    streamContent();
  }, [data]);

  return { streamedResult, mutate, mappedPoints, isLoading, error };
};

export default useOpenAiSSEResponse;
