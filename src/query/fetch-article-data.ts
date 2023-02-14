import { DocumentResponseData } from "~/types";

export const fetchArticleData = async (urlResource: string, chunkLength: number): Promise<DocumentResponseData> => {
  const res = await fetch(`/api/readability?url_resource="${urlResource}"&chunk_length=${chunkLength}`);
  return await res.json();
};
