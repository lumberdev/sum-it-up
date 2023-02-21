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
  const [lengthOfWords, setLengthOfWords] = useState<number>(0);
  const [inputError, setInputError] = useState<string>("");
  const type = "text";
  const maxWords = 500;
  const minChars = 100;
  const maxChars = 4000;

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputError("");
    if (typeof e.target.value === "string") {
      if (e.target.value.length >= maxChars)
        setInputError(`Input cannot exceed ${maxChars} characters, currently at ${e.target.value?.length} characters`);
      setLengthOfWords((state) => {
        const value = e.target.value as string;
        const length = value?.split(" ").filter((item) => item.length).length ?? 0;
        if (length <= maxWords) {
          setInputValue(value);
          return length;
        }
        setInputError(`Input cannot exceed ${maxWords} words, currently at ${state} words`);
        return state;
      });
    }
  };
  return (
    <div className="mx-auto max-w-[86rem]">
      <form
        className="flex w-full flex-col rounded-md"
        onSubmit={(event: React.SyntheticEvent) => {
          if (inputValue.length < minChars) {
            setInputError(
              `Input must be at least ${minChars} characters long, currently at ${inputValue.length} characters`,
            );
            event.preventDefault();
            return;
          }
          handleFormSubmit(event, type, summaryLength, customLength, "", inputValue);
        }}
      >
        <div className="relative mb-12 block min-h-[26rem] w-full resize-none overflow-hidden rounded-[20px] border-2 border-primary bg-white md:rounded-[30px]">
          <textarea
            className="block h-full min-h-[26rem] w-full resize-none overflow-y-auto rounded-[20px] border-none p-8 text-base outline-none placeholder:text-dark md:rounded-[30px] md:p-12"
            name="text-input"
            minLength={minChars}
            maxLength={maxChars}
            value={inputValue}
            placeholder="Enter some text"
            required
            onChange={handleInputChange}
          />
          <div data-test-id="counter" className="text-primary">
            {lengthOfWords} / {maxWords}
          </div>
          {inputError.length > 0 && (
            <div className=" absolute top-0 mx-auto w-full bg-white py-1 text-center text-primary opacity-80">
              {inputError}
            </div>
          )}
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
