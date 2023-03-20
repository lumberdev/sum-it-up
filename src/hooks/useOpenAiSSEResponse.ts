import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchArticleData } from "~/query/fetch-article-data";
import { ChatGPTModelRequest, ContentType, RequestBody, MarkdownResponse } from "~/types";
import { generatePromptSongMarkdown, generateTextSummaryMarkdown } from "~/utils/generatePrompt";
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
  onSuccess?: (res: MarkdownResponse) => unknown;
  onStream?: (res: MarkdownResponse) => unknown;
  onError?: (error: { message: string; name?: string }, data: RequestBody) => unknown;
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
    markdown: "",
    inputCharacterLength: -1,
    outputCharacterLength: -1,
    ...readabilityData,
  } as MarkdownResponse;

  const mappedResult = useRef<MarkdownResponse>(initTextMappedPoints);

  const fetchRef = useRef<() => unknown>();

  const streamContent = useCallback(({ data, textContent }: { data: RequestBody; textContent: string }) => {
    const { onStream, onSuccess, onError } = callbackFunctionRefs.current;
    const { wordLimit, type } = data;
    if (!data || !Object.keys(data).length) return;

    const promptObject =
      type === "text" || type === "article"
        ? generateTextSummaryMarkdown(textContent, wordLimit)
        : type === "song"
        ? generatePromptSongMarkdown(textContent, wordLimit)
        : [];

    const multiplier = Math.min(wordLimit > 100 ? 2.5 : 1.3);
    const maxTokenLimit = Math.min(Math.round(wordLimit * multiplier) + 600, 2000);
    const openAiPayload: ChatGPTModelRequest = {
      model: "gpt-3.5-turbo",
      messages: promptObject,
      max_tokens: maxTokenLimit,
      temperature: 0.2,
      presence_penalty: 0.5,
    };

    fetchRef.current = fetchServerSent(
      "https://api.openai.com/v1/chat/completions",
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

        const text = JSON.parse(payload).choices?.[0]?.delta?.content ?? "";
        setStreamedResult((state) => {
          console.log(`${state}${text}`);

          mappedResult.current = {
            ...mappedResult.current,
            markdown: `${state}${text}`,
            outputCharacterLength: `${state}${text}`.length,
            type,
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
    setIsError(false);
    setIsLoadingSSE(true);
    earlyClose.current = false;
    const { type, url, text } = data;

    const buildContentToStream = async () => {
      let textContent = "";
      try {
        if (type === "article" || type === "song") {
          const json = await fetchArticleData(url, 500);
          const inputCharacterLength = json.chunkedTextContent?.reduce((acc, value) => (acc += value.length), 0);

          mappedResult.current = {
            ...mappedResult.current,
            type,
            inputCharacterLength,
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
          const body = await getSummaryFromUrl(type, json.chunkedTextContent, url);
          textContent = body;
        } else {
          const chunkedText = textToChunks(text ?? "", 500);
          const inputCharacterLength = chunkedText?.reduce((acc, value) => (acc += value.length), 0);
          mappedResult.current = {
            ...mappedResult.current,
            inputCharacterLength,
          };
          textContent = await getSummaryFromUrl(type, chunkedText);
        }
        return textContent;
      } catch (err) {
        onError && onError(err as { message: string; name?: string }, data);
        setIsError(true);
      }
    };

    let textContent = "";

    textContent = (await buildContentToStream()) || "";
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
    setIsError(false);
    setIsLoadingSSE(false);
    if (!fetchRef.current) return;
    fetchRef.current();
  }

  return { streamedResult, mutate, isLoading, isLoadingSSE, isError, forceClose, readabilityData };
};

export default useOpenAiSSEResponse;
