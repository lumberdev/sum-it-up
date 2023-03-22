import { openAiGetUseableTextContent, openAIRequest } from "~/api-functions/open-ai-request";

import { ContentType, SongType, TextResponse, ResponseType, DocumentResponseData, DataType } from "~/types";

async function callWithText(text: string, wordLimit: number, type: ContentType): Promise<TextResponse> {
  try {
    const response = (await openAIRequest({
      textContent: text,
      wordLimit,
      type,
    })) as DataType;

    const validResponse = {
      type,
      trust: 0,
      inputCharacterLength: text.length,
      outputCharacterLength: JSON.stringify(response).length,
      ...response,
    };
    return { ...validResponse };
  } catch (error) {
    throw error;
  }
}
async function callWithUrl(
  url: string,
  wordLimit: number,
  type: ContentType,
  articleFetcher: (urlResource: string, chunkLength: number) => Promise<DocumentResponseData>,
): Promise<ResponseType> {
  try {
    const CHUNK_LENGTH = 500;

    const json = await articleFetcher(url, CHUNK_LENGTH);

    const body = await getSummaryFromUrl(type, json.chunkedTextContent);
    const response = (await openAIRequest({ textContent: body, type, wordLimit })) as DataType | SongType;

    const validResponse = {
      type,
      byline: json.byline,
      dir: json.dir,
      title: json.title,
      content: json.content,
      url,
      trust: 0,
      bias: "",
      inputCharacterLength: json.chunkedTextContent?.reduce((acc, value) => (acc += value.length), 0),
      outputCharacterLength: JSON.stringify(response).length,
      ...response,
    };
    return {
      ...validResponse,
    };
  } catch (error) {
    throw error;
  }
}

async function getSummaryFromUrl(type: ContentType, chunkedTextContent: Array<string>, url?: string) {
  // if res is good, process in openAPI
  return await summarizeChunkedContent(chunkedTextContent, 50, 50, type, url);
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
    max_token: maxToken,
    wordLimit,
    url,
  };
  const response = (await openAiGetUseableTextContent(body)) as string;
  return response;
}

export { callWithText, callWithUrl, getSummaryFromUrl };
