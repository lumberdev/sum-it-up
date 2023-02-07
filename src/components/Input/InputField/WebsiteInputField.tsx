import { useState } from "react";
import { ContentType } from "~/types";
import { handleFormSubmitType } from "../Input";

const WebsiteInputField = ({ handleFormSubmit }: { handleFormSubmit: handleFormSubmitType }) => {
  const [inputUrl, setInputUrl] = useState<string>("");
  const type = "article";
  return (
    <form
      className="flex h-11 w-full justify-center overflow-hidden rounded-full md:h-12"
      onSubmit={(event: React.SyntheticEvent) => handleFormSubmit(event, type, inputUrl)}
    >
      <input
        className="flex w-3/4 items-center justify-center px-4 pl-6"
        type="text"
        name="website-url"
        value={inputUrl}
        placeholder="Enter a web page URL"
        required
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <button
        type="submit"
        className="flex min-w-[8rem] items-center justify-center bg-primaryDark font-semibold text-white md:min-w-[10rem] md:text-heading4"
      >
        Summarize
      </button>
    </form>
  );
};

export default WebsiteInputField;
