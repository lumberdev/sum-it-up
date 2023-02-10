import readability from "~/api-functions/readability";
import { SDKBasedSummaryService, SummaryClient } from "./OpenAiClass";

const fetcherServer = new SDKBasedSummaryService(readability);

export const summaryClientSE = new SummaryClient(fetcherServer);
