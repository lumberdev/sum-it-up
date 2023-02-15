import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { fetchArticleData } from "~/query/fetch-article-data";
import {
  ContentType,
  openAiModelRequest,
  RequestBody,
  ResponseType,
  SongMeaningResponseType,
  TextSummaryResponseType,
} from "~/types";
import { generatePromptSongSSE, generatePromptTextSSE } from "~/utils/generatePrompt";
import { getSummaryFromUrl } from "~/utils/open-ai-fetch";
import { fetchServerSent } from "~/utils/sse-fetch";

/**
 * A hook that returns streamed text response from openAI
 */
const useOpenAiSSEResponse = ({
  onSuccess,
  onStream,
}: {
  onSuccess?: (res: ResponseType) => unknown;
  onStream?: (res: ResponseType) => unknown;
}) => {
  const [streamedResult, setStreamedResult] = useState<string>("");
  const [isLoadingSSE, setIsLoadingSSE] = useState<boolean>(true);

  const readabilityData = {
    title: "",
    dir: "",
    type: "article" as ContentType,
    byline: "",
    url: "",
  };

  const initTextMappedPoints = {
    keyPoints: [""],
    bias: "",
    summary: "",
    tone: "",
    trust: 0,
    ...readabilityData,
  };

  const initSongMappedPoints = {
    mood: "",
    moodColor: "",
    meaning: "",
    ...readabilityData,
  };
  // useRef to get most updated result without rerender
  const mappedResult = useRef<TextSummaryResponseType | SongMeaningResponseType>(initTextMappedPoints);

  const fetchRef = useRef<() => unknown>();

  const [isError, setIsError] = useState<boolean>();

  const streamContent = async (data: RequestBody) => {
    const { wordLimit, type, url, text } = data;
    setIsLoadingSSE(true);
    mappedResult.current = type === "song" ? { ...initSongMappedPoints, type } : { ...initTextMappedPoints, type };
    const buildContentToStream = async () => {
      let textContent = "";
      if (type === "article" || type === "song") {
        const json = await fetchArticleData(url, 500);
        mappedResult.current = { ...mappedResult.current, byline: json.byline, title: json.title, dir: json.dir, url };
        const body = await getSummaryFromUrl(type, json.chunkedTextContent);
        textContent = body;
      } else {
        textContent = text ?? "";
      }
      return textContent;
    };
    const textContent = await buildContentToStream();
    setStreamedResult("");
    if (!data || !Object.keys(data).length) return;

    const promptText =
      type === "text"
        ? generatePromptTextSSE(textContent, wordLimit)
        : type === "article"
        ? generatePromptTextSSE(textContent, wordLimit)
        : type === "song"
        ? generatePromptSongSSE(textContent, wordLimit)
        : "";

    const openAiPayload: openAiModelRequest = {
      model: "text-davinci-003",
      prompt: promptText,
      max_tokens: 1000,
      temperature: 0,
    };
    fetchRef.current = fetchServerSent(
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
          setIsLoadingSSE(false);
          onSuccess && onSuccess(mappedResult.current);
          return;
        }
        const text = JSON.parse(payload).choices?.[0]?.text;

        setStreamedResult((state) => {
          const array = `${state}${text}`.split("%%");
          if (type === "article" || type === "text")
            mappedResult.current = {
              ...mappedResult.current,
              summary: array?.[0],
              keyPoints: array?.[1]?.split("|"),
              bias: array?.[2],
              tone: array?.[3],
              trust: Number(array?.[4]),
            };
          else
            mappedResult.current = {
              ...mappedResult.current,
              meaning: array?.[0],
              mood: array?.[1],
              moodColor: array?.[2],
            };
          onStream && onStream(mappedResult.current);
          return `${state}${text}`;
        });
      },
      (err) => {
        setIsError(true);
      },
    );
  };

  useEffect(() => {
    !isLoadingSSE && fetchRef.current && fetchRef.current();
  }, [isLoadingSSE]);

  const { isLoading, mutate } = useMutation({
    mutationFn: streamContent,
  });

  return { streamedResult, mutate, isLoading, isLoadingSSE, isError };
};

export default useOpenAiSSEResponse;
