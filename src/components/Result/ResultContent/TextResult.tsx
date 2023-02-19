import Container from "../../utility-components/Container";
import { TextSummaryResponseType, TextResponse } from "~/types";
import ShareLinkButton from "../../utility-components/result/ShareLinkButton";

type TextResultPropType = {
  originalContent: string;
  textSummaryResponse: TextSummaryResponseType | TextResponse;
  isLoadingSSE: boolean;
};

const TextResult = ({ originalContent, textSummaryResponse, isLoadingSSE }: TextResultPropType) => {
  const isFirstCharVowel = (str: string): boolean => {
    return /^[aeiou]/i.test(str);
  };

  return (
    <Container>
      <div className="mx-auto mb-8 max-w-[75rem] rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Summary</h3>
          <div className="hidden md:block">
            <ShareLinkButton
              responseObject={textSummaryResponse}
              originalContent={originalContent}
              disabled={isLoadingSSE}
            />
          </div>
        </div>
        <p className="my-8 text-base leading-6 md:leading-8">{textSummaryResponse?.summary}</p>
        {textSummaryResponse.keyPoints?.length > 0 && (
          <>
            <div className="mt-16 flex items-center justify-between">
              <h3 className="text-xl font-bold">Key Points & Analysis</h3>
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
            <div className="mt-8 text-base leading-6 md:leading-8">
              This content has {isFirstCharVowel(textSummaryResponse.bias) ? "an" : "a"} {textSummaryResponse.bias.toLowerCase()} bias
              and {isFirstCharVowel(textSummaryResponse.tone) ? "an" : "a"} {textSummaryResponse.tone.toLowerCase()} tone.
            </div>
            {!isLoadingSSE && (
              <div className="mt-10 block md:hidden">
                <ShareLinkButton responseObject={textSummaryResponse} originalContent={originalContent} />
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default TextResult;
