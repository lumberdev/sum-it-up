import { useState } from "react";
import { SongMeaningResponseType, TextSummaryResponseType } from "~/types";
import ResultPageHeader from "./ResultPageHeader";
import { ResultPageContentType } from "~/types";
import SongResult from "./ResultContent/SongResult";
import TextResult from "./ResultContent/TextResult";
import ResultPageContentToggler from "../utility-components/result/ResultPageContentToggler";
import OriginalContent from "./ResultContent/OriginalContent";

type ResultProp = {
  originalContent: string;
  summaryResponse?: TextSummaryResponseType | SongMeaningResponseType | null;
  handleNewSearchBtnClick: () => void;
  songDetails: string;
};

const Result = ({ originalContent, summaryResponse, handleNewSearchBtnClick, songDetails }: ResultProp) => {
  const [resultPageContent, setResultPageContent] = useState<ResultPageContentType>("summary");

  return (
    <>
      <ResultPageHeader
        resultPageContent={resultPageContent}
        setResultPageContent={setResultPageContent}
        handleNewSearchBtnClick={handleNewSearchBtnClick}
      />
      <div className="my-12 text-center md:hidden">
        <ResultPageContentToggler resultPageContent={resultPageContent} setResultPageContent={setResultPageContent} />
      </div>
      {resultPageContent === "summary" && summaryResponse?.type === "song" && (
        <SongResult songMeaningResponse={summaryResponse as SongMeaningResponseType} />
      )}
      {resultPageContent === "summary" && summaryResponse?.type === "article" && (
        <TextResult textSummaryResponse={summaryResponse as TextSummaryResponseType} />
      )}
      {resultPageContent === "summary" && summaryResponse?.type === "text" && (
        <TextResult textSummaryResponse={summaryResponse as TextSummaryResponseType} />
      )}
      {resultPageContent === "original" && <OriginalContent content={originalContent} songDetails={songDetails} />}
      <div className="text-center">
        <button
          className="mb-12 inline-flex h-20 items-center justify-center  rounded-full border-2 border-primary bg-transparent px-16 text-base font-bold uppercase text-primary md:hidden"
          type="button"
          onClick={() => handleNewSearchBtnClick()}
        >
          Sum up a new one
        </button>
      </div>
    </>
  );
};

export default Result;
