"use client";

import { useState } from "react";
import { InputType, InputFormSubmissionType } from "~/types";
import WebsiteInputField from "./InputField/WebsiteInputField";
import SongInputField from "./InputField/SongInputField";
import TextInputField from "./InputField/TextInputField";
import Container from "../utility-components/Container";

const Input = ({ handleFormSubmit }: { handleFormSubmit: InputFormSubmissionType }) => {
  const [inputTypeSelected, setInputTypeSelected] = useState<InputType>(InputType.WEBSITE);

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
        {inputTypeSelected === InputType.WEBSITE && <WebsiteInputField handleFormSubmit={handleFormSubmit} />}
        {inputTypeSelected === InputType.SONG && <SongInputField handleFormSubmit={handleFormSubmit} />}
        {inputTypeSelected === InputType.TEXT && <TextInputField handleFormSubmit={handleFormSubmit} />}
      </div>
    </Container>
  );
};

export default Input;
