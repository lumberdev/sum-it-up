import { SetStateAction, useState } from "react";
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
  const [lengthOfChars, setLengthOfChars] = useState<number>(0);
  const [inputError, setInputError] = useState<string>("");
  const type = "text";
  const minChars = 100;
  const maxChars = 4000;

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputError("");
    if (typeof e.target.value === "string") {
      if (e.target.value.length >= maxChars)
        setInputError(`Input cannot exceed ${maxChars} characters, currently at ${e.target.value?.length} characters`);
      setLengthOfChars((state) => {
        const value = e.target.value as string;
        const length = value.length;
        if (length <= maxChars) {
          setInputValue(value);
          return length;
        }
        setInputError(`Input cannot exceed ${maxChars} words, currently at ${state} chars`);
        return state;
      });
    }
  };
  return (
    <div className="mx-auto max-w-[86rem] animate-fadeIn">
      <form
        onSubmit={(event: React.SyntheticEvent) => {
          if (inputValue.length < minChars) {
            setInputError(`Input must be at least ${minChars} characters long`);
            event.preventDefault();
            return;
          }
          handleFormSubmit(event, type, summaryLength, customLength, "", inputValue);
        }}
      >
        <div className="relative flex w-full flex-col rounded-md">
          <div className=" group  mb-12 block min-h-[26rem] w-full resize-none overflow-hidden rounded-[20px] border-2  border-primary  bg-white ring-inset focus-within:ring-2 md:rounded-[30px]">
            <textarea
              className="block h-full min-h-[26rem] w-full resize-none overflow-y-auto  bg-transparent p-8 text-base font-medium outline-none transition-all placeholder:font-normal  placeholder:text-dark/70 md:p-12"
              name="text-input"
              minLength={minChars}
              maxLength={maxChars}
              value={inputValue}
              placeholder="Enter some text"
              required
              onChange={handleInputChange}
            />
            <div data-test-id="counter" className="text-primary">
              {lengthOfChars} / {maxChars}
            </div>
          </div>
          {inputError.length > 0 && (
            <div className="absolute top-0 mx-auto w-full  py-1 text-center text-primary opacity-80">{inputError}</div>
          )}
        </div>

        <SummarizeButton>Summarize</SummarizeButton>
        <SummaryLengthSlider
          summaryLength={summaryLength}
          setSummaryLength={setSummaryLength}
          customLength={customLength}
          setCustomLength={setCustomLength}
        />
      </form>
    </div>
  );
};

export default TextInputField;
