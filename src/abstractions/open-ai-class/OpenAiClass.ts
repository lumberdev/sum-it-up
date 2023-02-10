import { callWithText, callWithUrl } from "~/utils/open-ai-fetch";
import { DocumentResponseData, RequestBody, ResponseType } from "~/types";

interface IFetchSummary {
  fetchSummary(props: RequestBody): Promise<ResponseType>;
}

class SDKBasedSummaryService implements IFetchSummary {
  constructor(private fetchArticle: (urlResource: string, chunkLength: number) => Promise<DocumentResponseData>) {}

  async fetchSummary(props: RequestBody): Promise<ResponseType> {
    const { url, text, type, wordLimit } = props;

    if ((type === "song" || type === "article") && !url) throw Error("Url not provided");
    else if (type === "song" || type === "article") return await callWithUrl(url, wordLimit, type, this.fetchArticle);

    if (type === "text" && !text) throw Error("Text not Provided");
    else if (type === "text" && text) return await callWithText(text, wordLimit, type);
    else throw Error("No valid input provided");
  }
}

class SummaryClient {
  constructor(private fetcher: IFetchSummary) {}

  async fetchSummary(props: RequestBody): Promise<ResponseType> {
    return await this.fetcher.fetchSummary(props);
  }
}

export { SummaryClient, SDKBasedSummaryService };
