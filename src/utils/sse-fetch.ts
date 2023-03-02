import { SSE } from "sse.js";
import { SSEOptionTypes } from "~/types";

const fetchServerSent = (
  input: RequestInfo | URL,
  init?: SSEOptionTypes | undefined,
  onStream?: (arg: any) => void,
  onError?: (args: unknown) => void,
) => {
  let forceClose = false;
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
    forceClose = true;
    source.close();
    source.removeEventListener("message", handleStream);
    source.removeEventListener("error", handleError);
  };
  return cleanup;
};
export { fetchServerSent };
