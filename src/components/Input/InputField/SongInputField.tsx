import { useState } from "react";
import SummaryLengthSlider from "../../utility-components/input/SummaryLengthSlider";
import { InputFormSubmissionType } from "~/types";
import SummarizeButton from "../../utility-components/input/SummarizeButton";

const SongInputField = ({ handleFormSubmit }: { handleFormSubmit: InputFormSubmissionType }) => {
  const [songTitle, setSongTitle] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [summaryLength, setSummaryLength] = useState("200");
  const type = "song";
  return (
    <div className="mx-auto max-w-[54rem]">
      <form
        className="flex w-full flex-col rounded-md"
        onSubmit={(event: React.SyntheticEvent) => {
          const inputUrl = `https://www.google.com/search?q=lyrics+to+${artistName.split(" ").join("-")}+${songTitle
            .split(" ")
            .join("-")}`;
          handleFormSubmit(event, type, summaryLength, inputUrl);
        }}
      >
        <input
          className="mb-4 h-20 rounded-full border-2 border-primary px-4 text-center text-base placeholder:text-dark md:mb-6 md:h-[5.7rem]"
          type="text"
          name="song-name"
          value={songTitle}
          required
          placeholder="Enter song title"
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <input
          className="mb-12 h-20 rounded-full border-2 border-primary px-4 text-center text-base placeholder:text-dark md:h-[5.7rem]"
          type="text"
          name="artist-name"
          value={artistName}
          placeholder="Enter artist"
          onChange={(e) => setArtistName(e.target.value)}
        />
        <SummarizeButton>Summarize</SummarizeButton>
      </form>
      <SummaryLengthSlider summaryLength={summaryLength} setSummaryLength={setSummaryLength} />
    </div>
  );
};

export default SongInputField;
