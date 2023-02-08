import { useState } from "react";
import { InputFormSubmissionType } from "~/types";
import SummaryLengthSlider from "./SummaryLengthSlider";

const TextInputField = ({ handleFormSubmit }: { handleFormSubmit: InputFormSubmissionType }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [summaryLength, setSummaryLength] = useState("200");
  const type = "text";
  return (
    <>
      <SummaryLengthSlider summaryLength={summaryLength} setSummaryLength={setSummaryLength} />
      <form
        className="flex w-full flex-col rounded-md"
        onSubmit={(event: React.SyntheticEvent) => handleFormSubmit(event, type, summaryLength, "", inputValue)}
      >
        <textarea
          className="block h-[16rem] w-full rounded-md border-2 border-primary p-2.5"
          name="text-input"
          value={inputValue}
          placeholder="Enter some text"
          required
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="mx-auto mt-4 flex h-11 w-[10rem] items-center justify-center rounded-full bg-primary text-heading4 font-semibold text-white md:h-12"
          type="submit"
        >
          Summarize
        </button>
      </form>
    </>
  );
};

export default TextInputField;
