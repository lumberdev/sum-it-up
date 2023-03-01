import { useState } from "react";
import SummaryLengthSlider from "../../utility-components/input/SummaryLengthSlider";
import { InputFormSubmissionType } from "~/types";
import SummarizeButton from "../../utility-components/input/SummarizeButton";

const SongInputField = ({
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
  const [songTitle, setSongTitle] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");

  const type = "song";
  const songInfo = `${songTitle} - ${artistName}`;
  return (
    <div className="mx-auto max-w-[54rem] animate-fadeIn">
      <form
        onSubmit={(event: React.SyntheticEvent) => {
          const inputUrl = `https://www.google.com/search?q=lyrics+to+${artistName.split(" ").join("-")}+${songTitle
            .split(" ")
            .join("-")}`;
          handleFormSubmit(event, type, summaryLength, customLength, inputUrl, "", songInfo);
        }}
      >
        <div className="flex w-full flex-col rounded-md">
          <input
            className="mb-4 h-20 rounded-full border-2 border-primary px-4 text-center text-base font-medium transition-all duration-200 placeholder:font-normal placeholder:!text-dark/70 focus:outline-none focus:ring-2 focus:ring-inset md:mb-6 md:h-[5.7rem]"
            type="text"
            name="song-name"
            value={songTitle}
            required
            placeholder="Enter song title"
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <input
            className="mb-12 h-20 rounded-full border-2 border-primary px-4 text-center text-base font-medium transition-all duration-200 placeholder:font-normal placeholder:!text-dark/70  focus:border-primary focus:outline-none focus:ring-2 focus:ring-inset md:h-[5.7rem]"
            type="text"
            name="artist-name"
            required
            value={artistName}
            placeholder="Enter artist"
            onChange={(e) => setArtistName(e.target.value)}
          />
          <SummarizeButton>Summarize</SummarizeButton>
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

export default SongInputField;
