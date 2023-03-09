import Container from "../../utility-components/Container";
import { SongMeaningResponseType } from "~/types";
import ShareLinkButton from "../../utility-components/result/ShareLinkButton";
import { useEffect } from "react";
import { encodeStateToUrl } from "~/utils/generateLinkToShare";
import useAnalytics from "~/hooks/use-analytics";

type SongResultPropType = {
  songMeaningResponse: SongMeaningResponseType;
  songDetails: string;
  originalContent: string;
  isLoadingSSE: boolean;
  trackShare: (properties: { shareURL: string }) => void;
};

const SongResult = ({
  songMeaningResponse,
  songDetails,
  originalContent,
  isLoadingSSE,
  trackShare,
}: SongResultPropType) => {
  const { trackRequestCompleted } = useAnalytics();

  useEffect(() => {
    if (!isLoadingSSE) {
      const encodedUrl = encodeStateToUrl(originalContent, songMeaningResponse, songDetails);
      trackRequestCompleted({ type: songMeaningResponse.type, output: songMeaningResponse.meaning });
      history.replaceState({}, "", encodedUrl);
    }
  }, [isLoadingSSE, originalContent, songDetails, songMeaningResponse]);
  return (
    <Container>
      <div className="mx-auto mb-12 max-w-[75rem] animate-fadeIn rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Song Meaning</h3>
          <div className="hidden md:block">
            <ShareLinkButton
              trackShare={trackShare}
              songDetails={songDetails}
              responseObject={songMeaningResponse}
              originalContent={originalContent}
              disabled={isLoadingSSE}
            />
          </div>
        </div>
        <p className="mt-8  text-base leading-6 md:leading-8">{songMeaningResponse.meaning}</p>
        {!isLoadingSSE && (
          <div className="mt-10 block md:hidden">
            <ShareLinkButton
              trackShare={trackShare}
              songDetails={songDetails}
              responseObject={songMeaningResponse}
              originalContent={originalContent}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default SongResult;
