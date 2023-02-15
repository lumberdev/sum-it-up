"use client";
import { useState } from "react";
import InputComponent from "~/components/Input/Input";
import { InputFormSubmissionType, ResponseType, SongMeaningResponseType, TextSummaryResponseType } from "~/types";
import { useMutation } from "@tanstack/react-query";
import { fetchSummaryData } from "~/query/fetch-summary-data";
import InputPageHeader from "~/components/Input/InputPageHeader";
import Result from "~/components/Result/Result";
import Loading from "~/components/Loading/Loading";
import Error from "~/components/Error/Error";

export default function Home() {
  const [originalContent, setOriginalContent] = useState("");
  const [displayResult, setDisplayResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<ResponseType | null>(null);
  const [songDetails, setSongDetails] = useState("");

  const { isLoading, mutate, isError, reset, status } = useMutation({
    mutationFn: fetchSummaryData,
    onSuccess: (res) => {
      setLocalStorage(res.openAiResponse);
      setCurrentResult(res.openAiResponse);
      setDisplayResult(true);
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
      text?.length && setOriginalContent(text);
    } else {
      inputUrl?.length && setOriginalContent(inputUrl);
    }
    mutate({
      url: inputUrl ?? "",
      wordLimit: parseInt(customLength || summaryLength),
      type,
      text,
    });
  };
  const handleNewSearchBtnClick = () => {
    setDisplayResult(false);
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
  // TODO: Refactor loading and error states
  if (isLoading) return <Loading reset={reset} summaryContent={originalContent} songDetails={songDetails} />;

  if (isError) return <Error />;

  return (
    <>
      {displayResult ? (
        <Result
          summaryResponse={currentResult as TextSummaryResponseType | SongMeaningResponseType}
          handleNewSearchBtnClick={handleNewSearchBtnClick}
          originalContent={originalContent}
          songDetails={songDetails}
        />
      ) : (
        <>
          <InputPageHeader />
          <InputComponent handleFormSubmit={handleFormSubmit} />
        </>
      )}
    </>
  );
}
