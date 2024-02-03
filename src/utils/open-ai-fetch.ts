import { openAiGetUseableTextContent } from "~/api-functions/open-ai-request";

import { ContentType } from "~/types";

async function getSummaryFromUrl(type: ContentType, chunkedTextContent: Array<string>, url?: string) {
  // if res is good, process in openAPI
  return await summarizeChunkedContent(chunkedTextContent, 500, 2000, type, url);
}

async function summarizeChunkedContent(
  chunkedTextContent: Array<string>,
  wordLimit: number,
  maxToken: number,
  type: ContentType,
  url?: string,
): Promise<string> {
  const body = {
    type,
    chunkedTextContent,
    maxToken,
    wordLimit,
    url,
  };
  const response = (await openAiGetUseableTextContent(body)) as string;
  return response;
}

export { getSummaryFromUrl };
