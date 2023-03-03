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

export default function ClientPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const [originalContent, setOriginalContent] = useState(searchParams.original ?? "");
  const urlRegex = /^(https?:\/\/)?[0-9a-z-_]*(\.[0-9a-z-_]+)*(\.[a-z]+)+(\/[0-9a-z-_]*)*?\/?$/i;
  const [displayOriginalContent, setDisplayOriginalContent] = useState(
    urlRegex.test(searchParams.original) ? "" : searchParams.original,
  );
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

  const { mutate, isLoading, isLoadingSSE, streamedResult, forceClose, isError } = useOpenAiSSEResponse({
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
      setDisplayResult(false);
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
    return (
      <Loading
        summaryContent={originalContent}
        songDetails={songDetails}
        handleNewSearchBtnClick={handleNewSearchBtnClick}
      />
    );

  return (
    <>
      {displayResult ? (
        <Result
          trackShare={trackShare}
          summaryResponse={currentResult as TextSummaryResponseType | SongMeaningResponseType}
          handleNewSearchBtnClick={handleNewSearchBtnClick}
          originalContent={originalContent}
          displayOriginalContent={displayOriginalContent}
          songDetails={songDetails}
          isLoadingSSE={isLoadingSSE}
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
