"use client";
import { useEffect, useState } from "react";
import InputComponent from "~/components/Input/Input";
import About from "~/components/About";
import SongResult from "~/components/Result/SongResult";
import TextResult from "~/components/Result/TextResult";
import {
  InputFormSubmissionType,
  RequestBody,
  ResponseType,
  SongMeaningResponseType,
  TextSummaryResponseType,
} from "~/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import loaderGif from "../assets/loader.gif";
import errorIcon from "../assets/error.png";
import Container from "~/components/utility-components/Container";
import { summaryClientFE } from "~/abstractions/open-ai-class/client";
import useOpenAiSSEResponse from "~/hooks/useOpenAiSSEResponse";

export default function Home() {
  const [displayResult, setDisplayResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<ResponseType | null>(null);
  const clientfetcher = (props: RequestBody) => {
    return summaryClientFE.fetchSummary(props);
  };
  const {
    isLoading,
    mutate: mutate1,
    isError,
  } = useMutation({
    mutationFn: clientfetcher,
    onSuccess: (res) => {
      setLocalStorage(res);
      setCurrentResult(res);
      setDisplayResult(true);
    },
  });

  const { mutate, streamedResult, mappedPoints } = useOpenAiSSEResponse();

  const handleFormSubmit: InputFormSubmissionType = async (event, type, summaryLength, inputUrl, text) => {
    event.preventDefault();
    mutate({
      url: inputUrl ?? "",
      wordLimit: parseInt(summaryLength),
      type,
      text,
    });
  };
  const handNewSearchBtnClick = () => {
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
        {streamedResult}
        <div>{JSON.stringify(mappedPoints)}</div>
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
        {streamedResult}
        <div>{JSON.stringify(mappedPoints)}</div>
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
      {streamedResult}
      <div>{JSON.stringify(mappedPoints)}</div>
      {displayResult ? (
        currentResult?.type == "song" ? (
          <SongResult
            songMeaningResponse={currentResult as SongMeaningResponseType}
            handNewSearchBtnClick={handNewSearchBtnClick}
          />
        ) : (
          <TextResult
            textSummaryResponse={currentResult as TextSummaryResponseType}
            handNewSearchBtnClick={handNewSearchBtnClick}
          />
        )
      ) : (
        <InputComponent handleFormSubmit={handleFormSubmit} />
      )}
    </>
  );
}
