"use client";

import { useState } from "react";
import { InputType, InputFormSubmissionType } from "~/types";
import WebsiteInputField from "./InputField/WebsiteInputField";
import SongInputField from "./InputField/SongInputField";
import TextInputField from "./InputField/TextInputField";
import Container from "../utility-components/Container";

const Input = ({
  handleFormSubmit,
  onInputChange,
  onLengthChange,
}: {
  handleFormSubmit: InputFormSubmissionType;
  onInputChange: (properties: { type: string }) => any;
  onLengthChange: (properties: { length: number }) => any;
}) => {
  const [inputTypeSelected, setInputTypeSelected] = useState<InputType>(InputType.WEBSITE);
  const [summaryLength, setSummaryLength] = useState("200");
  const [customLength, setCustomLength] = useState("");

  const handleSummaryLengthChange = (length: string) => {
    onLengthChange({ length: Number(length) });
    setSummaryLength(length);
  };

  const handleInputTypeChange = (type: InputType) => {
    onInputChange({ type });
    setInputTypeSelected(type);
  };
  return (
    <Container>
      <div className="mx-auto w-full py-20 text-center">
        <div className="relative mx-auto mb-[7rem] inline-flex h-[4.5rem] w-full max-w-[28rem] items-center justify-center rounded-full bg-primary p-2 text-white md:max-w-[33rem]">
          {(Object.keys(InputType) as Array<keyof typeof InputType>).map((key) => (
            <button
              key={key}
              className={`z-10 h-full flex-1 rounded-full text-sm font-bold uppercase transition ${
                InputType[key] === inputTypeSelected && " text-primary"
              } ${InputType[key] !== inputTypeSelected && "hover:bg-white/10"}`}
              onClick={() => handleInputTypeChange(InputType[key])}
            >
              {InputType[key]}
            </button>
          ))}
          <span
            className={`z-1 absolute left-2 right-auto h-[calc(100%-1rem)] w-[calc(33.33%-0.5rem)] rounded-full bg-white transition-all duration-200 ease-in-out ${
              inputTypeSelected === InputType.TEXT && "!left-1/2 !-translate-x-1/2"
            } ${inputTypeSelected === InputType.SONG && "!left-2/3 !right-2"}`}
          ></span>
        </div>
        {inputTypeSelected === InputType.WEBSITE && (
          <WebsiteInputField
            handleFormSubmit={handleFormSubmit}
            summaryLength={summaryLength}
            setSummaryLength={handleSummaryLengthChange}
            customLength={customLength}
            setCustomLength={setCustomLength}
          />
        )}
        {inputTypeSelected === InputType.SONG && (
          <SongInputField
            handleFormSubmit={handleFormSubmit}
            summaryLength={summaryLength}
            setSummaryLength={handleSummaryLengthChange}
            customLength={customLength}
            setCustomLength={setCustomLength}
          />
        )}
        {inputTypeSelected === InputType.TEXT && (
          <TextInputField
            handleFormSubmit={handleFormSubmit}
            summaryLength={summaryLength}
            setSummaryLength={handleSummaryLengthChange}
            customLength={customLength}
            setCustomLength={setCustomLength}
          />
        )}
      </div>
    </Container>
  );
};

export default Input;
