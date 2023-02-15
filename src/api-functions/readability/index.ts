import { DocumentResponseData } from "~/types";
import { textToChunks } from "~/utils/text-to-chunks";
import { scrapeReadability } from "./scrape-readability";

const readability = async (urlResource: string, chunkLength: number): Promise<DocumentResponseData> => {
  if (!urlResource) throw Error("urlResource required");
  const result = await scrapeReadability(urlResource);
  try {
    const chunkedNumber = !isNaN(chunkLength) ? chunkLength : 2000;
    if (result) {
      return {
        url: urlResource,
        chunkedTextContent: textToChunks(result.textContent, chunkedNumber),
        ...result,
      };
    }
  } catch (error) {
    throw error;
  }
  throw new Error("No Response");
};

export default readability;
