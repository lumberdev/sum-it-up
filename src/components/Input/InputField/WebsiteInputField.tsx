import { useState } from "react";
import SummaryLengthSlider from "./SummaryLengthSlider";
import { InputFormSubmissionType } from "~/types";

const WebsiteInputField = ({ handleFormSubmit }: { handleFormSubmit: InputFormSubmissionType }) => {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [summaryLength, setSummaryLength] = useState("200");
  const type = "article";
  return (
    <>
      <SummaryLengthSlider summaryLength={summaryLength} setSummaryLength={setSummaryLength} />
      <form
        className="flex h-11 w-full justify-center overflow-hidden rounded-full md:h-12"
        onSubmit={(event: React.SyntheticEvent) => handleFormSubmit(event, type, summaryLength, inputUrl)}
      >
        <input
          className="flex w-3/4 items-center justify-center rounded-l-full border-2 border-primary px-4 pl-6"
          type="text"
          name="website-url"
          value={inputUrl}
          placeholder="Enter a web page URL"
          required
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button
          type="submit"
          className="flex min-w-[8rem] items-center justify-center bg-primary font-semibold text-white md:min-w-[10rem] md:text-heading4"
        >
          Summarize
        </button>
      </form>
    </>
  );
};

export default WebsiteInputField;
