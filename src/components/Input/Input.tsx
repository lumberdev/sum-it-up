"use client";

import { useState } from "react";
import { ContentType, InputType, RequestBody } from "~/types";
import WebsiteInputField from "./InputField/WebsiteInputField";
import SongInputField from "./InputField/SongInputField";
import TextInputField from "./InputField/TextInputField";
import { useMutation } from "@tanstack/react-query";
import Container from "../utility-components/Container";
import { ResponseType } from "~/types";
import { fetchSummaryData } from "~/query/fetch-summary-data";
import Image from "next/image";
import loaderGif from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
export type handleFormSubmitType = (
  event: React.SyntheticEvent,
  type: ContentType,
  inputUrl?: string,
  text?: string,
) => Promise<void>;

const Input = ({ handleSummarize }: { handleSummarize: (newResult: ResponseType) => void }) => {
  const [inputTypeSelected, setInputTypeSelected] = useState<InputType>(InputType.WEBSITE);
  const [summaryLength, setSummaryLength] = useState("200");

  const { isLoading, mutate, error, isError } = useMutation({
    mutationFn: fetchSummaryData,
    onSuccess: (res) => {
      console.log(res);
      handleSummarize(res.openAiResponse);
    },
  });

  const handleFormSubmit: handleFormSubmitType = async (event, type, inputUrl, text) => {
    event.preventDefault();
    mutate({
      url: inputUrl ?? "",
      wordLimit: parseInt(summaryLength),
      type,
      text,
    });
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
    <Container>
      <div className="mx-auto max-w-[31.875rem] py-8 text-center">
        <div className="mx-auto inline-flex h-12 w-full max-w-[21.5rem] items-center justify-center rounded-full bg-primary p-1 text-white">
          {(Object.keys(InputType) as Array<keyof typeof InputType>).map((key) => (
            <button
              key={key}
              className={`h-full flex-1 rounded-full transition${
                InputType[key] === inputTypeSelected && " bg-white text-dark"
              }`}
              onClick={() => setInputTypeSelected(InputType[key])}
            >
              {InputType[key]}
            </button>
          ))}
        </div>
        <div className="my-12 flex flex-col items-center justify-center">
          <label htmlFor="summary-length" className="mb-6 font-bold text-dark">
            Length of the summary in words:
          </label>
          <input
            type="range"
            className="range-sm mb-6 flex h-1 w-full cursor-pointer appearance-none items-center rounded-lg bg-medium p-0 focus:shadow-none dark:bg-gray-700 md:max-w-[30rem]"
            min="100"
            max="300"
            step="100"
            list="markers"
            value={summaryLength}
            id="summary-length"
            onChange={(event) => {
              setSummaryLength(event.target.value);
            }}
          />

          <div className="flex w-full justify-between">
            <div>Shortest</div>
            <div>Short</div>
            <div>Short-ish</div>
          </div>
        </div>
        {inputTypeSelected === InputType.WEBSITE && <WebsiteInputField handleFormSubmit={handleFormSubmit} />}
        {inputTypeSelected === InputType.SONG && <SongInputField handleFormSubmit={handleFormSubmit} />}
        {inputTypeSelected === InputType.TEXT && <TextInputField handleFormSubmit={handleFormSubmit} />}
      </div>
    </Container>
  );
};

export default Input;
