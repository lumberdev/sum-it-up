import { fetchArticleData } from "~/query/fetch-article-data";
import { SDKBasedSummaryService, SummaryClient } from "./OpenAiClass";

const fetcher = new SDKBasedSummaryService(fetchArticleData);

export const summaryClientFE = new SummaryClient(fetcher);
