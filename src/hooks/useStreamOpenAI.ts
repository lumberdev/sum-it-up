import { useCallback, useRef, useState } from "react";
import { initTextMappedPoints, MAX_TOKEN_SIZE } from "~/constants";
import { ChatGPTModelRequest, MarkdownResponse, RequestBody } from "~/types";
import { buildPromptObject } from "~/utils/build-prompt-object";
import { fetchServerSent } from "~/utils/sse-fetch";

export function useStreamOpenAI() {
  const [streamValue, setStreamValue] = useState<string>("");

  const fetchRef = useRef<() => unknown>(() => null);

  const streamContent = useCallback(
    ({
      data,
      textContent,
      callbackFunctions,
    }: {
      data: RequestBody;
      textContent: string;
      callbackFunctions: {
        onSuccess?: (res: MarkdownResponse) => unknown;
        onStream?: (res: MarkdownResponse) => unknown;
        onError?: (error: { message: string; name?: string }, data: RequestBody) => unknown;
      };
    }) => {
      const { onSuccess, onError, onStream } = callbackFunctions;
      const { wordLimit, type, title = "" } = data;
      setStreamValue("");

      if (!data || !Object.keys(data).length) return;

      const promptObject = buildPromptObject(type, textContent, wordLimit, title);

      const multiplier = Math.min(wordLimit > 100 ? 2.5 : 1.3);
      const maxTokenLimit = Math.min(Math.round(wordLimit * multiplier) + 600, MAX_TOKEN_SIZE);
      const openAiPayload: ChatGPTModelRequest = {
        model: "gpt-3.5-turbo-0125",
        messages: promptObject,
        max_tokens: maxTokenLimit,
        temperature: 0.2,
        presence_penalty: 0.5,
      };
      let mappedResult = initTextMappedPoints;
      fetchRef.current = fetchServerSent(
        `${process.env.NEXT_PUBLIC_PROXY}/openai/v1/chat/completions`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          payload: JSON.stringify({
            ...openAiPayload,
            stream: true,
          }),
        },
        (payload) => {
          if ((payload as string) === "[DONE]") {
            onSuccess && onSuccess(mappedResult);
            return;
          }
          const parsedPayload = JSON.parse(payload as string);
          const text = parsedPayload.choices?.[0]?.delta?.content ?? "";

          setStreamValue((state) => {
            mappedResult = {
              ...mappedResult,
              markdown: `${state}${text}`,
              outputCharacterLength: `${state}${text}`.length,
              type,
              model: parsedPayload.model,
            };

            onStream && onStream(mappedResult);

            return `${state}${text}`;
          });
        },
        (err) => {
          onError && onError(err as { message: string }, data);
        },
      );
    },
    [],
  );
  return {
    resetStream: fetchRef.current,
    streamValue,
    stream: streamContent,
  };
}
