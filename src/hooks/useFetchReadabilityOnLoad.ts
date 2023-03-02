import { useQuery } from "@tanstack/react-query";
import { fetchArticleData } from "~/query/fetch-article-data";

const useFetchReadabilityOnLoad = (original: string) => {
  const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;
  // Fetch readability data in server and pass to client side

  const { isLoading, error, data } = useQuery({
    queryKey: ["readabilityDataLoad"],
    queryFn: async () => {
      if (urlRegex.test(original.trim())) {
        const res = await fetchArticleData(original.trim(), 500);
        if (res) return res.content ?? original;
      }
      return original;
    },
    retry: 3,
  });

  return { error, data, isLoading };
};

export default useFetchReadabilityOnLoad;
