"use client";
import { useState } from "react";
import InputComponent from "~/components/Input/Input";
import { InputFormSubmissionType, ResponseType, SongMeaningResponseType, TextSummaryResponseType } from "~/types";
import { useMutation } from "@tanstack/react-query";
import { fetchSummaryData } from "~/query/fetch-summary-data";
import Image from "next/image";
import loaderGif from "../assets/loader.gif";
import errorIcon from "../assets/error.png";
import Container from "~/components/utility-components/Container";
import InputPageHeader from "~/components/Input/InputPageHeader";
import Result from "~/components/Result/Result";

export default function Home() {
  const [originalContent, setOriginalContent] = useState("");
  const [displayResult, setDisplayResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<ResponseType | null>(null);

  const { isLoading, mutate, isError } = useMutation({
    mutationFn: fetchSummaryData,
    onSuccess: (res) => {
      setLocalStorage(res.openAiResponse);
      setCurrentResult(res.openAiResponse);
      setDisplayResult(true);
    },
  });

  const handleFormSubmit: InputFormSubmissionType = async (event, type, summaryLength, inputUrl, text) => {
    event.preventDefault();
    if (type === "text") {
      text?.length && setOriginalContent(text);
    } else {
      inputUrl?.length && setOriginalContent(inputUrl);
    }
    mutate({
      url: inputUrl ?? "",
      wordLimit: parseInt(summaryLength),
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
  if (isLoading)
    return (
      <Container>
        <div className="flex min-h-[30rem] items-center justify-center pb-10 text-center">
          <div>
            <Image src={loaderGif} alt="my gif" height={200} width={200} />
          </div>
        </div>
      </Container>
    );

  if (isError)
    return (
      <Container>
        <div className="flex min-h-[30rem] flex-col items-center justify-center text-center">
          <div>
            <Image src={errorIcon} alt="error" height={200} width={200} />
          </div>
          <h2 onClick={() => window.location.reload()} className="top-10 cursor-pointer text-heading3 font-bold">
            Try Again!
          </h2>
        </div>
      </Container>
    );

  return (
    <>
      {displayResult ? (
        <Result
          summaryResponse={currentResult as TextSummaryResponseType | SongMeaningResponseType}
          handleNewSearchBtnClick={handleNewSearchBtnClick}
          originalContent={originalContent}
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
