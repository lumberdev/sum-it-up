import { useEffect, useState } from "react";
import { openAiModelRequest } from "~/types";
import { fetchServerSent } from "~/utils/sse-fetch";

/**
 * A hook that returns streamed text response from openAI
 */
const useOpenAiSSEResponse = (payload: openAiModelRequest) => {
  const [streamedResult, setStreamedResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  useEffect(() => {
    fetchServerSent(
      "https://api.openai.com/v1/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        },
        method: "POST",
        payload: JSON.stringify({
          ...payload,
          stream: true,
        }),
      },
      (payload: string) => {
        if ((payload as string) === "[DONE]") {
          setIsLoading(false);
          return;
        }
        setStreamedResult((state) => `${state} ${JSON.parse(payload).choices?.[0]?.text}`);
      },
      (err) => {
        setError(true);
      },
    );
  }, [payload]);

  return { streamedResult, isLoading, error };
};

export default useOpenAiSSEResponse;
