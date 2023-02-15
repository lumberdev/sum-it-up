"use client";

import { useState } from "react";
import { InputType, InputFormSubmissionType } from "~/types";
import WebsiteInputField from "./InputField/WebsiteInputField";
import SongInputField from "./InputField/SongInputField";
import TextInputField from "./InputField/TextInputField";
import Container from "../utility-components/Container";

const Input = ({ handleFormSubmit }: { handleFormSubmit: InputFormSubmissionType }) => {
  const [inputTypeSelected, setInputTypeSelected] = useState<InputType>(InputType.WEBSITE);
  const [summaryLength, setSummaryLength] = useState("200");
  const [customLength, setCustomLength] = useState("");

  return (
    <Container>
      <div className="mx-auto w-full py-20 text-center">
        <div className="mx-auto mb-[7rem] inline-flex h-[4.5rem] w-full max-w-[28rem] items-center justify-center rounded-full bg-primary p-2 text-white md:max-w-[33rem]">
          {(Object.keys(InputType) as Array<keyof typeof InputType>).map((key) => (
            <button
              key={key}
              className={`h-full flex-1 rounded-full text-sm font-bold uppercase transition${
                InputType[key] === inputTypeSelected && " bg-white text-primary"
              }`}
              onClick={() => setInputTypeSelected(InputType[key])}
            >
              {InputType[key]}
            </button>
          ))}
        </div>
        {inputTypeSelected === InputType.WEBSITE && (
          <WebsiteInputField
            handleFormSubmit={handleFormSubmit}
            summaryLength={summaryLength}
            setSummaryLength={setSummaryLength}
            customLength={customLength}
            setCustomLength={setCustomLength}
          />
        )}
        {inputTypeSelected === InputType.SONG && (
          <SongInputField
            handleFormSubmit={handleFormSubmit}
            summaryLength={summaryLength}
            setSummaryLength={setSummaryLength}
            customLength={customLength}
            setCustomLength={setCustomLength}
          />
        )}
        {inputTypeSelected === InputType.TEXT && (
          <TextInputField
            handleFormSubmit={handleFormSubmit}
            summaryLength={summaryLength}
            setSummaryLength={setSummaryLength}
            customLength={customLength}
            setCustomLength={setCustomLength}
          />
        )}
      </div>
    </Container>
  );
};

export default Input;
