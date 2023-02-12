import { useState } from "react";
import { InputFormSubmissionType } from "~/types";
import SummaryLengthSlider from "../../utility-components/input/SummaryLengthSlider";
import SummarizeButton from "../../utility-components/input/SummarizeButton";

const TextInputField = ({ handleFormSubmit }: { handleFormSubmit: InputFormSubmissionType }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [summaryLength, setSummaryLength] = useState("200");
  const type = "text";
  return (
    <div className="mx-auto max-w-[86rem]">
      <form
        className="flex w-full flex-col rounded-md"
        onSubmit={(event: React.SyntheticEvent) => handleFormSubmit(event, type, summaryLength, "", inputValue)}
      >
        <div className="mb-12 block min-h-[26rem] w-full resize-none overflow-hidden rounded-[20px] border-2 border-primary bg-white md:rounded-[30px]">
          <textarea
            className="block h-full min-h-[26rem] w-full resize-none overflow-y-auto rounded-[20px] border-none p-8 text-base placeholder:text-dark md:rounded-[30px] md:p-12"
            name="text-input"
            value={inputValue}
            placeholder="Enter some text"
            required
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <SummarizeButton>Summarize</SummarizeButton>
      </form>
      <SummaryLengthSlider summaryLength={summaryLength} setSummaryLength={setSummaryLength} />
    </div>
  );
};

export default TextInputField;
