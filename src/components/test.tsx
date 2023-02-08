"use client";

import { useQuery } from "@tanstack/react-query";
import { useFetchArticleData } from "~/hooks/use-fetch-article-data";
import { fetchArticleData } from "~/query/fetch-article-data";

const TestComponent = () => {
  const url = "https://www.nytimes.com/live/2023/01/26/us/tyre-nichols-death-memphis";
  const { refetch, data } = useFetchArticleData({ url });
  function handleFetchData() {
    refetch();
  }
  console.log(data);
  return (
    <div>
      <button onClick={handleFetchData} className="m-10 p-10 rounded-lg bg-red-300">
        button
      </button>
      <div>{`${data?.textContent}`}</div>
    </div>
  );
};

export default TestComponent;
