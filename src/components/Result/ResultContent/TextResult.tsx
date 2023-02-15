import Container from "../../utility-components/Container";
import { TextSummaryResponseType } from "~/types";
import CopyButton from "../../utility-components/result/CopyButton";

type TextResultPropType = {
  textSummaryResponse: TextSummaryResponseType;
};

const TextResult = ({ textSummaryResponse }: TextResultPropType) => {
  return (
    <Container>
      <div className="mx-auto mb-12 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Summary</h3>
          <div className="hidden md:block">
            <CopyButton textToCopy={textSummaryResponse.summary} />
          </div>
        </div>
        <p className="my-8 text-base leading-6 md:leading-8">{textSummaryResponse.summary}</p>
        {textSummaryResponse.keyPoints?.length > 0 && (
          <>
            <div className="block md:hidden">
              <CopyButton textToCopy={textSummaryResponse.summary} />
            </div>
            <div className="mt-16 flex items-center justify-between">
              <h3 className="text-xl font-bold">Key Points & Analysis</h3>
              <div className="hidden md:block">
                <CopyButton
                  textToCopy={textSummaryResponse.keyPoints?.join("\n")}
                />
              </div>
            </div>
            <ul className="my-8 list-disc px-6 text-base leading-6 md:leading-8">
              {textSummaryResponse.keyPoints?.map((keyPoint, id) => (
                <li key={id}>{keyPoint}</li>
              ))}
            </ul>
          </>
        )}

        {textSummaryResponse.bias && textSummaryResponse.tone && (
          <>
            <div className="mb-4 text-base leading-6 md:leading-8">
              This article has a {textSummaryResponse.bias} bias and {textSummaryResponse.tone} tone
            </div>
            <div className="block md:hidden">
              <CopyButton textToCopy={textSummaryResponse.keyPoints?.join("\n")} />
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default TextResult;
