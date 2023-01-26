import { useQuery } from "@tanstack/react-query";
import { fetchArticleData } from "~/query/fetch-article-data";

export const useFetchArticleData = ({ url }: Props) => {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["articleData"],
    queryFn: () => fetchArticleData(url),
    enabled: false,
  });

  return { isLoading, isError, data, error, refetch, isFetching };
};

type Props = {
  url: string;
};
