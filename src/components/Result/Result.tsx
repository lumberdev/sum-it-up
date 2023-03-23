import { useEffect, useState } from "react";
import { MarkdownResponse } from "~/types";
import ResultPageHeader from "./ResultPageHeader";
import { ResultPageContentType } from "~/types";
import ResultPageContentToggler from "../utility-components/result/ResultPageContentToggler";
import OriginalContent from "./ResultContent/OriginalContent";
import { encodeStateToUrl } from "~/utils/generateLinkToShare";
import useAnalytics from "~/hooks/use-analytics";
import GenericResult from "./ResultContent/GenericResult";

type ResultProp = {
  originalContent: string;
  displayOriginalContent: string;
  markdownResponse?: MarkdownResponse;
  handleNewSearchBtnClick: () => void;
  songDetails: string;
  isLoadingSSE: boolean;
  trackShare: (properties: { shareURL: string }) => void;
};

const Result = ({
  originalContent,
  displayOriginalContent,
  markdownResponse,
  handleNewSearchBtnClick,
  trackShare,
  songDetails,
  isLoadingSSE,
}: ResultProp) => {
  const [resultPageContent, setResultPageContent] = useState<ResultPageContentType>("summary");

  const { trackRequestCompleted } = useAnalytics();

  useEffect(() => {
    if (!isLoadingSSE && markdownResponse) {
      let encodedUrl = "";
      if (markdownResponse?.type === "song") {
        encodedUrl = encodeStateToUrl(originalContent, markdownResponse, songDetails);
        trackRequestCompleted({
          type: markdownResponse.type,
          output: markdownResponse.markdown,
          inputCharacterLength: markdownResponse.inputCharacterLength,
          outputCharacterLength: markdownResponse.outputCharacterLength,
        });
      } else {
        const originalContentString = originalContent;
        encodedUrl = encodeStateToUrl(originalContentString, markdownResponse);
        trackRequestCompleted({
          type: markdownResponse.type,
          output: JSON.stringify(markdownResponse),
          inputCharacterLength: markdownResponse.inputCharacterLength,
          outputCharacterLength: markdownResponse.outputCharacterLength,
        });
      }
      history.replaceState({}, "", encodedUrl);
    }
  }, [isLoadingSSE, originalContent, songDetails, markdownResponse, trackRequestCompleted]);

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

      {resultPageContent === "summary" && markdownResponse && (
        <GenericResult
          trackShare={trackShare}
          songDetails={songDetails}
          markdownResponse={markdownResponse}
          originalContent={originalContent}
          isLoadingSSE={isLoadingSSE}
          type={markdownResponse?.type}
        />
      )}

      {resultPageContent === "original" && (
        <OriginalContent
          content={displayOriginalContent}
          contentType={markdownResponse?.type || null}
          songDetails={songDetails}
        />
      )}
      <div className="text-center">
        <button
          className="mb-[6rem] inline-flex h-20 items-center justify-center  rounded-full border-2 border-primary bg-transparent px-16 text-base font-bold uppercase text-primary md:hidden"
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
