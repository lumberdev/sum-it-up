import { useState } from "react";
import { InputFormSubmissionType } from "~/types";
import SummaryLengthSlider from "../../utility-components/input/SummaryLengthSlider";
import SummarizeButton from "../../utility-components/input/SummarizeButton";

const TextInputField = ({
  handleFormSubmit,
  summaryLength,
  setSummaryLength,
  customLength,
  setCustomLength,
}: {
  handleFormSubmit: InputFormSubmissionType;
  summaryLength: string;
  setSummaryLength: (length: string) => void;
  customLength: string;
  setCustomLength: (length: string) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const type = "text";
  return (
    <div className="mx-auto max-w-[86rem] animate-fadeIn">
      <form
        className="flex w-full flex-col rounded-md"
        onSubmit={(event: React.SyntheticEvent) =>
          handleFormSubmit(event, type, summaryLength, customLength, "", inputValue)
        }
      >
        <div className="mb-12 block min-h-[26rem] w-full resize-none overflow-hidden rounded-[20px] bg-white md:rounded-[30px]">
          <textarea
            className="block h-full min-h-[26rem] w-full resize-none overflow-y-auto rounded-[20px] border-2 border-primary p-8 text-base font-medium transition-all placeholder:font-normal placeholder:text-dark/70 focus:ring-2 focus:ring-inset md:rounded-[30px] md:p-12"
            name="text-input"
            value={inputValue}
            placeholder="Enter some text"
            required
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <SummarizeButton>Summarize</SummarizeButton>
      </form>
      <SummaryLengthSlider
        summaryLength={summaryLength}
        setSummaryLength={setSummaryLength}
        customLength={customLength}
        setCustomLength={setCustomLength}
      />
    </div>
  );
};

export default TextInputField;
