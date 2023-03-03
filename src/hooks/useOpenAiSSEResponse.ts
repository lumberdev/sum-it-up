import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { textToChunks } from "~/utils/text-to-chunks";

/**
 * A hook that returns streamed text response from openAI
 */
const useOpenAiSSEResponse = ({
  onSuccess,
  onStream,
  onError,
  onReadability,
}: {
  onSuccess?: (res: ResponseType) => unknown;
  onStream?: (res: ResponseType) => unknown;
  onError?: (error: { message: string }, data: RequestBody) => unknown;
  onReadability?: (data: { [key: string]: string }) => unknown;
}) => {
  // store callbacks here so if they ever change they don't rerender the internal hook state.
  const callbackFunctionRefs = useRef({ onSuccess, onStream, onError });

  const [streamedResult, setStreamedResult] = useState<string>("");
  const [isLoadingSSE, setIsLoadingSSE] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [textContent, setTextContent] = useState("");

  const earlyClose = useRef(false);

  const readabilityData = {
    title: "",
    dir: "",
    type: "article" as ContentType,
    byline: "",
    content: "",
    url: "",
  };
  const initTextMappedPoints = {
    keyPoints: [],
    bias: "",
    summary: "",
    tone: "",
    trust: 0,
    ...readabilityData,
  };

  // const initSongMappedPoints = {
  //   mood: "",
  //   moodColor: "",
  //   meaning: "",
  //   ...readabilityData,
  // };
  // useRef to get most updated result without rerender
  const mappedResult = useRef<TextSummaryResponseType | SongMeaningResponseType>(initTextMappedPoints);

  const fetchRef = useRef<() => unknown>();


  const streamContent = useCallback(({ data, textContent }: { data: RequestBody; textContent: string }) => {
    const { onStream, onSuccess, onError } = callbackFunctionRefs.current;
    const { wordLimit, type } = data;
    if (!data || !Object.keys(data).length) return;

    const promptText =
      type === "text"
        ? generatePromptTextSSE(textContent, wordLimit)
        : type === "article"
        ? generatePromptTextSSE(textContent, wordLimit)
        : type === "song"
        ? generatePromptSongSSE(textContent, wordLimit)
        : "";

    const multiplier = Math.min(wordLimit > 100 ? 2.5 : 1.3);
    const maxTokenLimit = Math.min(Math.round(wordLimit * multiplier) + 600, 2000);
    const openAiPayload: openAiModelRequest = {
      model: "text-davinci-003",
      prompt: promptText,
      max_tokens: maxTokenLimit,
      temperature: 0.2,
      presence_penalty: 0.5,
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
              keyPoints: array?.[1]?.split("|").filter((point) => point.trim() !== ""),
              bias: array?.[2],
              tone: array?.[3],
              trust: Number(array?.[4]),
              type,
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
        onError && onError(err as { message: string }, data);
        setIsError(true);
      },
    );
  }, []);

  const [data, setData] = useState<RequestBody | null>(null);

  const initiate = async (data: RequestBody) => {
    setIsLoadingSSE(true);
    earlyClose.current = false;
    const { type, url, text } = data;

    const buildContentToStream = async () => {
      let textContent = "";
      if (type === "article" || type === "song") {
        const json = await fetchArticleData(url, 500);
        mappedResult.current = {
          ...mappedResult.current,
          type,
          byline: json.byline,
          title: json.title,
          dir: json.dir,
          url,
        };
        if (typeof onReadability === "function")
          onReadability({
            byline: json.byline,
            title: json.title,
            dir: json.dir,
            url,
            content: json.content,
          });
        const body = await getSummaryFromUrl(type, json.chunkedTextContent);
        textContent = body;
      } else {
        const chunkedText = textToChunks(text ?? "", 500);
        textContent = await getSummaryFromUrl(type, chunkedText);
      }
      return textContent;
    };

    let textContent = "";

    textContent = await buildContentToStream();
    return { textContent, data };
  };

  useEffect(() => {
    setStreamedResult("");
    if (!textContent || !data || earlyClose.current) return;
    streamContent({ data, textContent });
  }, [textContent, data, earlyClose, streamContent]);

  const { mutate, reset, isLoading } = useMutation({
    mutationFn: initiate,
    onSuccess: (res) => {
      setTextContent(res.textContent);
      setData(res.data);
    },
    onError: (res, variables) => {
      const { onError } = callbackFunctionRefs.current;
      onError && onError(res as { message: string }, variables);
      setIsError(true);
    },
  });

  function forceClose() {
    earlyClose.current = true;
    reset();
    setData(null);
    setIsLoadingSSE(false);
    if (!fetchRef.current) return;
    fetchRef.current();
  }

  return { streamedResult, mutate, isLoading, isLoadingSSE, isError, forceClose, readabilityData };
};

export default useOpenAiSSEResponse;
