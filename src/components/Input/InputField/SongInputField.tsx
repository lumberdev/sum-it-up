import { useState } from "react";
import SummaryLengthSlider from "./SummaryLengthSlider";
import { InputFormSubmissionType } from "~/types";

const SongInputField = ({ handleFormSubmit }: { handleFormSubmit: InputFormSubmissionType }) => {
  const [songTitle, setSongTitle] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [summaryLength, setSummaryLength] = useState("200");
  const type = "song";
  return (
    <>
      <SummaryLengthSlider summaryLength={summaryLength} setSummaryLength={setSummaryLength} />
      <form
        className="flex w-full flex-col rounded-md"
        onSubmit={(event: React.SyntheticEvent) => {
          const inputUrl = `https://www.google.com/search?q=lyrics+to+${artistName.split(" ").join("-")}+${songTitle
            .split(" ")
            .join("-")}`;
          handleFormSubmit(event, type, summaryLength, inputUrl);
        }}
      >
        <label className="mb-3 font-semibold" htmlFor="song-name">
          Enter Song Title
        </label>
        <input
          className="mb-6 h-12 rounded-full border-2 border-primary px-4 text-center"
          type="text"
          name="song-name"
          value={songTitle}
          required
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <label className="mb-3 font-semibold" htmlFor="artist-name border-primary border-2 rounded-l-full">
          Enter Artist
        </label>
        <input
          className="mb-6 h-12 rounded-full border-2 border-primary px-4 text-center"
          type="text"
          name="artist-name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <button
          className="mx-auto mt-4 flex h-11 w-[10rem] items-center justify-center rounded-full bg-primary text-heading4 font-semibold text-white md:h-12"
          type="submit"
        >
          Summarize
        </button>
      </form>
    </>
  );
};

export default SongInputField;
