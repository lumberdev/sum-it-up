import { SSE } from "sse.js";
import { SSEOptionTypes } from "~/types";

const fetchServerSent = (
  input: RequestInfo | URL,
  init?: SSEOptionTypes | undefined,
  onStream?: (arg: any) => void,
  onError?: (args: unknown) => void,
) => {
  const source = SSE(input, init);

  source.addEventListener("message", (event: MessageEvent) => {
    const payload = event.data;
    if (typeof onStream === "function") onStream(payload);
  });

  source.addEventListener("error", (err: unknown) => {
    if (typeof onError === "function") onError(err);
  });
  source.stream();
  const cleanup = () => {
    source.close();
  };
  return cleanup;
};
export { fetchServerSent };
