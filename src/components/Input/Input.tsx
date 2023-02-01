"use client";

import { useState } from "react";
import { ContentType, InputType, RequestBody } from "~/types";
import WebsiteInputField from "./InputField/WebsiteInputField";
import SongInputField from "./InputField/SongInputField";
import TextInputField from "./InputField/TextInputField";
import { fetchSummaryData } from "~/query/fetch-summary-data";
import Container from "../utility-components/Container";

export type handleFormSubmitType = (
  event: React.SyntheticEvent,
  type: ContentType,
  wordLimit: number,
  inputUrl?: string,
  text?: string
) => Promise<void>;

const Input = () => {
  const [inputTypeSelected, setInputTypeSelected] = useState<InputType>(
    InputType.WEBSITE
  );
  const [summaryLength, setSummaryLength] = useState("200");

  const handleFormSubmit: handleFormSubmitType = async (
    event,
    type,
    wordLimit,
    inputUrl,
    text
  ) => {
    event.preventDefault();
    try {
      const request: RequestBody = {
        url: inputUrl ?? "",
        wordLimit,
        type,
        text,
      };
      const res = await fetchSummaryData(request);

      const existingData = localStorage.getItem("summaries");
      if (existingData) {
        const existingDataArr: { [key: string]: string }[] =
          JSON.parse(existingData);
        existingDataArr.push(res);
        localStorage.setItem("summaries", JSON.stringify(existingDataArr));
      } else {
        localStorage.setItem("summaries", JSON.stringify([res]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="mx-auto max-w-[31.875rem] py-8 text-center">
        <div className="mx-auto inline-flex h-12 w-full max-w-[21.5rem] items-center justify-center rounded-full bg-dark p-1 text-white">
          {(Object.keys(InputType) as Array<keyof typeof InputType>).map(
            (key) => (
              <button
                key={key}
                className={`h-full flex-1 rounded-full transition${
                  InputType[key] === inputTypeSelected && " bg-white text-dark"
                }`}
                onClick={() => setInputTypeSelected(InputType[key])}
              >
                {InputType[key]}
              </button>
            )
          )}
        </div>
        <div className="my-12 flex flex-col items-center justify-center">
          <label htmlFor="summary-length" className="mb-6 font-bold text-dark">
            Length of the summary in words:
          </label>
          <input
            type="range"
            className="flex w-full cursor-pointer items-center bg-medium p-0 focus:shadow-none md:max-w-[30rem]"
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

          <datalist id="markers" className="flex w-full justify-between pt-4">
            <option value="100" label="Shortest"></option>
            <option value="200" label="Short"></option>
            <option value="300" label="Short-ish"></option>
          </datalist>
        </div>
        {inputTypeSelected === InputType.WEBSITE && (
          <WebsiteInputField handleFormSubmit={handleFormSubmit} />
        )}
        {inputTypeSelected === InputType.SONG && (
          <SongInputField handleFormSubmit={handleFormSubmit} />
        )}
        {inputTypeSelected === InputType.TEXT && (
          <TextInputField handleFormSubmit={handleFormSubmit} />
        )}
      </div>
    </Container>
  );
};

export default Input;
