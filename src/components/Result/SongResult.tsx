"use client";

import { useState, useEffect } from "react";
import Container from "../utility-components/Container";
import { SongMeaningResponseType } from "~/types";

type ResultProp = {
  songMeaningResponse: SongMeaningResponseType | null;
  handNewSearchBtnClick: () => void;
};

const SongResult = ({ songMeaningResponse, handNewSearchBtnClick }: ResultProp) => {
  const [didCopy, setDidCopy] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (didCopy) {
      timeoutId = setTimeout(() => setDidCopy(false), 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [didCopy]);

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setDidCopy(true);
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  };

  return (
    <Container>
      <div className="mx-auto mb-8 max-w-3xl md:mt-8">
        <h3 className="my-4 text-heading3">Here is the meaning for the song:</h3>
        {songMeaningResponse && (
          <div className="rounded-md bg-medium p-8 pb-6">
            {songMeaningResponse.meaning}
            <button
              onClick={() => {
                copyToClipboard(songMeaningResponse.meaning);
              }}
              className="mt-6 ml-auto block rounded-md bg-darkest px-4 py-1 text-white"
            >
              {didCopy ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
      <div className="mx-auto max-w-3xl py-8">
        <button className="ml-auto block text-right font-bold" onClick={handNewSearchBtnClick}>
          New Search
        </button>
      </div>
    </Container>
  );
};

export default SongResult;
