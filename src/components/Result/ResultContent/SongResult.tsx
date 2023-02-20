import Container from "../../utility-components/Container";
import { SongMeaningResponseType } from "~/types";
import ShareLinkButton from "../../utility-components/result/ShareLinkButton";
import { useEffect } from "react";
import { encodeStateToUrl } from "~/utils/generateLinkToShare";

type SongResultPropType = {
  songMeaningResponse: SongMeaningResponseType;
  songDetails: string;
  isLoadingSSE: boolean;
};

const SongResult = ({ songMeaningResponse, songDetails, isLoadingSSE }: SongResultPropType) => {
  useEffect(() => {
    if (!isLoadingSSE) {
      const encodedUrl = encodeStateToUrl(songDetails, songMeaningResponse);
      history.replaceState({}, "", encodedUrl);
    }
  }, [isLoadingSSE, songDetails, songMeaningResponse]);
  return (
    <Container>
      <div className="mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Summary</h3>
          <div className="hidden md:block">
            <ShareLinkButton
              responseObject={songMeaningResponse}
              originalContent={songDetails}
              disabled={isLoadingSSE}
            />
          </div>
        </div>
        <p className="mt-8  text-base leading-6 md:leading-8">{songMeaningResponse.meaning}</p>
        {!isLoadingSSE && (
          <div className="mt-10 block md:hidden">
            <ShareLinkButton responseObject={songMeaningResponse} originalContent={songDetails} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default SongResult;
