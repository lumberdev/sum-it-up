"use client";
import { useEffect, useState } from "react";
import SummaryLengthSlider from "../../utility-components/input/SummaryLengthSlider";
import { InputFormSubmissionType } from "~/types";
import StyledInputWithSubmit from "~/components/utility-components/input/StyledInput";

const WebsiteInputField = ({
  handleFormSubmit,
  summaryLength,
  setSummaryLength,
  customLength,
  setCustomLength,
  queryURL,
}: {
  handleFormSubmit: InputFormSubmissionType;
  summaryLength: string;
  setSummaryLength: (length: string) => void;
  customLength: string;
  setCustomLength: (length: string) => void;
  queryURL?: string;
}) => {
  const [inputUrl, setInputUrl] = useState<string>("");
  const type = "article";
  const urlRegex = /^(http\:\/\/|https\:\/\/)?([a-z0-9]*\.)+[a-z0-9].*$/i; // Match https or http or not, match hostname, match a domain, match anything else

  useEffect(() => {
    if (queryURL) {
      const event = new Event("build");
      handleFormSubmit(event, type, summaryLength, customLength, queryURL);
    }
  }, []);

  return (
    <div className="mx-auto max-w-[54rem] animate-fadeIn">
      <form
        onSubmit={(event: React.SyntheticEvent) => {
          handleFormSubmit(event, type, summaryLength, customLength, inputUrl);
          return;
        }}
      >
        <StyledInputWithSubmit
          name="article-url"
          value={inputUrl}
          placeholder="Enter an article page URL"
          required
          onChange={(e) => {
            if (!urlRegex.test(e.target.value)) e.target.setCustomValidity("Please enter a valid URL");
            else e.target.setCustomValidity("");
            setInputUrl(e.target.value);
          }}
          buttonTitle="Summarize"
        />
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
