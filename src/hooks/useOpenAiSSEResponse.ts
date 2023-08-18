import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { RequestBody, MarkdownResponse } from "~/types";
import { buildContentToStream } from "~/utils/build-content-to-stream";
import { useStreamOpenAI } from "./useStreamOpenAI";

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

  const [isLoadingSSE, setIsLoadingSSE] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { resetStream, streamValue, stream } = useStreamOpenAI();

  const onProcessError = (callbackFn?: ((...args: any) => void) | null) => () => {
    callbackFn && callbackFn();
    setIsError(true);
  };

  const initiate = async (data: RequestBody) => {
    setIsError(false);
    setIsLoadingSSE(true);
    const { type, url, text = "" } = data;
    // Get readability data
    const result = await buildContentToStream(type, url, text);
    return { ...result };
  };

  const { mutate, reset, isLoading } = useMutation({
    mutationFn: initiate,
    onSuccess: async (res, variables) => {
      const { mappedReadabilityObject, textContent } = res;
      onReadability && // Pass readability content through to client
        onReadability({
          byline: mappedReadabilityObject.byline ?? "",
          title: mappedReadabilityObject.title,
          dir: mappedReadabilityObject.dir ?? "",
          url: variables.url,
          content: mappedReadabilityObject.content,
        });

      if (textContent)
        // If text content exists, start streaming content
        stream({
          data: variables,
          textContent: textContent,
          callbackFunctions: {
            // Call external error fn, set error to true
            onError: onProcessError(onError),
            onSuccess: (res: MarkdownResponse) => {
              // Call success and set SSE loading to false since it's starting here
              onSuccess && onSuccess(res);
              setIsLoadingSSE(false);
            },
            onStream,
          },
        });
    },
    onError: (res, variables) => {
      console.error("ERROR:", res);
      const { onError } = callbackFunctionRefs.current;
      // Call external error fn, set error to true
      onProcessError(onError ? () => onError(res as { message: string }, variables) : null)();
    },
  });

  const forceClose = useCallback(() => {
    reset();
    setIsError(false);
    setIsLoadingSSE(false);
    resetStream();
  }, [reset, resetStream]);

  return { streamValue, mutate, isLoading, isLoadingSSE, isError, forceClose };
};

export default useOpenAiSSEResponse;
