import { openAIRequest } from "~/api-functions/open-ai-request";
import { DataType } from "~/mock-response";
import { fetchArticleData } from "~/query/fetch-article-data";
import { ContentType, SongType, TextResponse, ResponseType, DocumentResponseData } from "~/types";

async function callWithText(text: string, wordLimit: number, type: ContentType): Promise<TextResponse> {
  try {
    const response = (await openAIRequest({
      text,
      wordLimit,
      type,
    })) as DataType;
    return { ...response, type };
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
    // if res is good, process in openAPI

    if (!json) throw Error("Readability failed.");
    const body = {
      type,
      chunkedTextContent: json.chunkedTextContent,
      wordLimit,
    };
    const response = (await openAIRequest(body)) as DataType | SongType;

    return {
      ...response,
      byline: json.byline,
      title: json.title,
      dir: json.dir,
      url: json.url,
      type,
    };
  } catch (error) {
    throw error;
  }
}

export { callWithText, callWithUrl };
