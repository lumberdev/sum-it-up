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
  const type = "article";
  return (
    <div className="mx-auto max-w-[54rem]">
      <form
        className="mx-auto flex w-full flex-col justify-center md:flex-row"
        onSubmit={(event: React.SyntheticEvent) => handleFormSubmit(event, type, summaryLength, customLength, inputUrl)}
      >
        <input
          className="mb-8 flex h-20 items-center justify-center rounded-full border-2 border-primary px-4 pl-6 placeholder:text-dark md:mb-0 md:h-[5.7rem] md:flex-1 md:rounded-r-none"
          type="text"
          name="website-url"
          value={inputUrl}
          placeholder="Enter a web page URL"
          pattern="^(https?|ftp):\/\/[^\s/:?#][^\s]*$" // Regex to check if the input is a valid URL
          required
          onChange={(e) => {
            // This will display the error message on browser's default tooltip
            if (!e.target.validity.valid) {
              e.target.setCustomValidity("Please enter a valid URL");
            } else {
              e.target.setCustomValidity("");
            }
            setInputUrl(e.target.value);
          }}
        />
        <SummarizeButton className="md:!h-[5.7rem] md:rounded-l-none ">Summarize</SummarizeButton>
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

export default WebsiteInputField;
