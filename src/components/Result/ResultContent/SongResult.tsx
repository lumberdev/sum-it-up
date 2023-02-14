import Container from "../../utility-components/Container";
import { SongMeaningResponseType } from "~/types";
import CopyButton from "../../utility-components/result/CopyButton";

type SongResultPropType = {
  songMeaningResponse: SongMeaningResponseType;
};

const SongResult = ({ songMeaningResponse }: SongResultPropType) => {
  return (
    <Container>
      <div className="mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Summary</h3>
          <div className="hidden md:block">
            <CopyButton textToCopy={songMeaningResponse.meaning} />
          </div>
        </div>
        <p className="my-8 text-base leading-6 md:leading-8">{songMeaningResponse.meaning}</p>
      </div>
      <div className="block md:hidden">
        <CopyButton textToCopy={songMeaningResponse.meaning} />
      </div>
    </Container>
  );
};

export default SongResult;
