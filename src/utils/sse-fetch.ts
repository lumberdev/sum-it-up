import { SSE } from "sse.js";
import { SSEOptionTypes } from "~/types";

const fetchServerSent = (
  input: RequestInfo | URL,
  init?: SSEOptionTypes | undefined,
  onStream?: (arg: unknown) => void,
  onError?: (args: unknown) => void,
) => {
  const source = SSE(input, init);

  const handleStream = (event: MessageEvent) => {
    const payload = event.data;
    if (typeof onStream === "function") onStream(payload);
  };

  const handleError = (err: unknown) => {
    if (typeof onError === "function") onError(err);
  };

  source.addEventListener("message", handleStream);

  source.addEventListener("error", handleError);
  source.stream();

  const cleanup = () => {
    source.removeEventListener("message", handleStream);
    source.removeEventListener("error", handleError);
    source.close();
  };
  return cleanup;
};
export { fetchServerSent };
