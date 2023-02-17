import Container from "../../utility-components/Container";
import { SongMeaningResponseType } from "~/types";
import ShareLinkButton from "../../utility-components/result/ShareLinkButton";

type SongResultPropType = {
  originalContent: string;
  songMeaningResponse: SongMeaningResponseType;
  songDetails: string;
  isStreaming: boolean;
};

const SongResult = ({ originalContent, songMeaningResponse, songDetails, isStreaming }: SongResultPropType) => {
  return (
    <Container>
      <div className="mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Summary</h3>
          <div className="hidden md:block">
            <ShareLinkButton
              responseObject={songMeaningResponse}
              originalContent={songDetails}
              disabled={isStreaming}
            />
          </div>
        </div>
        <p className="mt-8 mb-10 text-base leading-6 md:leading-8">{songMeaningResponse.meaning}</p>
      <div className="block md:hidden">
        <ShareLinkButton responseObject={songMeaningResponse} originalContent={songDetails} disabled={isStreaming} />
      </div>
      </div>
    </Container>
  );
};

export default SongResult;
