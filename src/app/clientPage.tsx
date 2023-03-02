"use client";
import { useState } from "react";
import InputComponent from "~/components/Input/Input";
import { InputFormSubmissionType, ResponseType, SongMeaningResponseType, TextSummaryResponseType } from "~/types";
import InputPageHeader from "~/components/Input/InputPageHeader";
import Result from "~/components/Result/Result";
import Loading from "~/components/Loading/Loading";
import Error from "~/components/Error/Error";
import useOpenAiSSEResponse from "~/hooks/useOpenAiSSEResponse";
import useAnalytics from "~/hooks/use-analytics";
import { fetchArticleData } from "~/query/fetch-article-data";
import { useQuery } from "@tanstack/react-query";

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

export default function ClientPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const [originalContent, setOriginalContent] = useState(searchParams.original ?? "");
  //
  const {
    data: original,
    error: err,
    isLoading: initLoadingReadability,
  } = useFetchReadabilityOnLoad(searchParams.original);

  const [displayOriginalContent, setDisplayOriginalContent] = useState(searchParams.original);

  const [displayResult, setDisplayResult] = useState<boolean>(
    searchParams.original.length > 0 && searchParams.result.length > 0,
  );
  const [currentResult, setCurrentResult] = useState<ResponseType | null>(
    searchParams.result && JSON.parse(searchParams.result),
  );
  const [songDetails, setSongDetails] = useState("");

  const {
    trackInputSelection,
    trackLengthSelection,
    trackSubmit,
    trackNewSummary,
    trackRequestError,
    trackRequestCompleted,
    trackShare,
  } = useAnalytics();

  const { mutate, isLoading, isLoadingSSE, streamedResult, forceClose, isError, reset } = useOpenAiSSEResponse({
    onSuccess: (res: ResponseType) => {
      setLocalStorage(res);
      trackRequestCompleted({ type: res.type, output: streamedResult });
    },
    onStream: (res) => {
      setDisplayResult(true);
      setCurrentResult(res);
    },
    onReadability: (res) => {
      setDisplayOriginalContent(res.content);
    },
    onError: (err, data) => {
      trackRequestError({ ...data, error: (err?.message as string) ?? "" });
    },
  });

  const handleFormSubmit: InputFormSubmissionType = async (
    event,
    type,
    summaryLength,
    customLength,
    inputUrl,
    text,
    songInfo = "",
  ) => {
    event.preventDefault();
    setSongDetails(songInfo);
    if (type === "text") {
      setSongDetails("");
      text?.length && setDisplayOriginalContent(text);
      text?.length && setOriginalContent(text);
    } else {
      inputUrl?.length && setOriginalContent(inputUrl);
    }
    trackSubmit({ type: type, length: customLength || summaryLength, input: inputUrl || text || "" });
    mutate({
      url: inputUrl ?? "",
      wordLimit: Number(customLength || summaryLength),
      type,
      text,
    });
  };
  const handleNewSearchBtnClick = () => {
    forceClose();
    setDisplayResult(false);
    setOriginalContent("");
    setCurrentResult(null);
    setDisplayOriginalContent("");
    setSongDetails("");
    window.history.replaceState(null, "", window.location.origin);
    trackNewSummary();
  };

  const setLocalStorage = (newData: ResponseType) => {
    const existingData = localStorage.getItem("summaries");
    if (existingData) {
      const existingDataArr: ResponseType[] = JSON.parse(existingData);
      existingDataArr.push(newData);
      localStorage.setItem("summaries", JSON.stringify(existingDataArr));
    } else {
      localStorage.setItem("summaries", JSON.stringify([newData]));
    }
  };

  if (isError) return <Error />;
  if (isLoading || (!displayResult && isLoadingSSE))
    return <Loading reset={reset} summaryContent={originalContent} songDetails={songDetails} />;

  return (
    <>
      {displayResult ? (
        <Result
          trackShare={trackShare}
          summaryResponse={currentResult as TextSummaryResponseType | SongMeaningResponseType}
          handleNewSearchBtnClick={handleNewSearchBtnClick}
          originalContent={originalContent}
          displayOriginalContent={original ?? displayOriginalContent}
          songDetails={songDetails}
          isLoadingSSE={initLoadingReadability ?? isLoadingSSE}
        />
      ) : (
        <>
          <InputPageHeader />
          <InputComponent
            handleFormSubmit={handleFormSubmit}
            onInputChange={trackInputSelection}
            onLengthChange={trackLengthSelection}
          />
        </>
      )}
    </>
  );
}
