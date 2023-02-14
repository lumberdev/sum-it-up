import { openAiGetUseableTextContent, openAIRequest } from "~/api-functions/open-ai-request";
import { fetchArticleData } from "~/query/fetch-article-data";
import {
  ContentType,
  SongType,
  TextResponse,
  ResponseType,
  DocumentResponseData,
  OpenAiRequestProps,
  DataType,
} from "~/types";

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
    // await fetchRetry(`/readability?url_resource=${url}`, 100, 3)
    const json = await articleFetcher(url, CHUNK_LENGTH);

    const body = await getSummaryFromUrl(type, json.chunkedTextContent);
    const response = (await openAIRequest({ textContent: body, type, wordLimit })) as DataType | SongType;

    const validResponse = {
      type,
      byline: json.byline,
      dir: json.dir,
      title: json.title,
      url,
      trust: 0,
      ...response,
    };
    return {
      ...validResponse,
    };
  } catch (error) {
    throw error;
  }
}

async function getSummaryFromUrl(type: ContentType, chunkedTextContent: Array<string>) {
  // if res is good, process in openAPI
  return await summarizeChunkedContent(chunkedTextContent, 50, 50, type);
}

async function summarizeChunkedContent(
  chunkedTextContent: Array<string>,
  wordLimit: number,
  maxToken: number,
  type: ContentType,
): Promise<string> {
  const body = {
    type,
    chunkedTextContent,
    max_token: maxToken,
    wordLimit,
  };
  const response = (await openAiGetUseableTextContent(body)) as string;
  return response;
}

export { callWithText, callWithUrl, getSummaryFromUrl };
