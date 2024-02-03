import { DEFAULT_CHUNK_SIZE, initTextMappedPoints } from "~/constants";
import { fetchArticleData } from "~/query/fetch-article-data";
import { ContentType } from "~/types";
import { getSummaryFromUrl } from "./open-ai-fetch";
import { textToChunks } from "./text-to-chunks";

/**
 *
 * @param type
 * @param url
 * @param text
 * build readability data for useOpenAISSEResponse hook
 */
export const buildContentToStream = async (type: ContentType, url: string, text: string) => {
  let textContent = "";
  let mappedReadabilityObject = { ...initTextMappedPoints };

  try {
    if (type === "article" || type === "song") {
      const json = await fetchArticleData(url, DEFAULT_CHUNK_SIZE);
      const inputCharacterLength = json.chunkedTextContent?.reduce((acc, value) => (acc += value.length), 0);

      mappedReadabilityObject = {
        ...mappedReadabilityObject,
        type,
        inputCharacterLength,
        byline: json.byline,
        title: json.title,
        dir: json.dir,
        content: json.content,
        url,
      };
      const body = await getSummaryFromUrl(type, json.chunkedTextContent, url);
      textContent = body;
    } else {
      const chunkedText = textToChunks(text ?? "", DEFAULT_CHUNK_SIZE);
      const inputCharacterLength = chunkedText?.reduce((acc, value) => (acc += value.length), 0);
      mappedReadabilityObject = {
        ...mappedReadabilityObject,
        inputCharacterLength,
      };
      textContent = await getSummaryFromUrl(type, chunkedText);
    }

    return { textContent, mappedReadabilityObject };
  } catch (err) {
    const error = err as { message: string; name?: string };
    throw error;
  }
};
