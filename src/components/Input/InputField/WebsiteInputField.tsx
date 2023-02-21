import { useState } from "react";
import SummaryLengthSlider from "../../utility-components/input/SummaryLengthSlider";
import { InputFormSubmissionType } from "~/types";
import SummarizeButton from "../../utility-components/input/SummarizeButton";

const WebsiteInputField = ({
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
  const [inputUrl, setInputUrl] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const type = "article";
  return (
    <div className="relative mx-auto max-w-[54rem]">
      <form
        className="mx-auto flex w-full flex-col justify-center md:flex-row"
        onSubmit={(event: React.SyntheticEvent) => {
          if (
            /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i.test(inputUrl) ||
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i.test(
              inputUrl,
            )
          ) {
            handleFormSubmit(event, type, summaryLength, customLength, inputUrl);
            return;
          }

          event.preventDefault();
          setInputError("Invalid URL");
        }}
      >
        <input
          className="mb-8 flex h-20 items-center justify-center rounded-full border-2 border-primary px-4 pl-6 placeholder:text-dark md:mb-0 md:h-[5.7rem] md:flex-1 md:rounded-r-none"
          type="text"
          name="website-url"
          value={inputUrl}
          placeholder="Enter a web page URL"
          required
          onChange={(e) => {
            setInputUrl(e.target.value);
            setInputError("");
          }}
        />

        <SummarizeButton className="md:!h-[5.7rem] md:rounded-l-none ">Summarize</SummarizeButton>
      </form>
      {inputError.length > 0 && (
        <div className="bottom-100% absolute mx-auto w-full py-1 text-center text-primary opacity-80">{inputError}</div>
      )}
      <SummaryLengthSlider
        summaryLength={summaryLength}
        setSummaryLength={setSummaryLength}
        customLength={customLength}
        setCustomLength={setCustomLength}
      />
    </div>
  );
};

export default WebsiteInputField;
