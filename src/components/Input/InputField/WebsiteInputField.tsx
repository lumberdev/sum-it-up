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
  const urlRegex = /^(http\:\/\/|https\:\/\/)?([a-z0-9]*\.)+[a-z0-9].*$/i; // Match https or http or not, match hostname, match a domain, match anything else

  return (
    <div className="mx-auto max-w-[54rem] animate-fadeIn">
      <form
        onSubmit={(event: React.SyntheticEvent) => {
          handleFormSubmit(event, type, summaryLength, customLength, inputUrl);
          return;
        }}
      >
        <div className="mx-auto flex w-full flex-col justify-center md:flex-row">
          <input
            className="mb-8 flex h-20 items-center justify-center rounded-full border-2 border-primary px-4 pl-6 font-medium transition-all duration-200 placeholder:font-normal placeholder:!text-dark/70 focus:outline-none focus:ring-2 focus:ring-inset md:mb-0 md:h-[5.7rem] md:flex-1 md:rounded-r-none"
            name="article-url"
            value={inputUrl}
            placeholder="Enter an article page URL"
            required
            onChange={(e) => {
              if (!urlRegex.test(e.target.value)) e.target.setCustomValidity("Please enter a valid URL");
              else e.target.setCustomValidity("");
              setInputUrl(e.target.value);
            }}
          />

          <SummarizeButton className="md:!h-[5.7rem] md:rounded-l-none ">Summarize</SummarizeButton>
        </div>

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

export default WebsiteInputField;
