import MarkdownComponent from "~/components/Markdown";
import Container from "~/components/utility-components/Container";
import ShareLinkButton from "~/components/utility-components/result/ShareLinkButton";
import { ContentType, MarkdownResponse } from "~/types";

type GenericResultPropType = {
  markdownResponse: MarkdownResponse;
  songDetails?: string;
  originalContent: string;
  isLoadingSSE: boolean;
  trackShare: (properties: { shareURL: string }) => void;
  type?: ContentType;
};

const GenericResult = ({
  trackShare,
  songDetails,
  markdownResponse,
  originalContent,
  isLoadingSSE,
  type,
}: GenericResultPropType) => {
  const header = type === "song" ? "Song Meaning" : "article" ? "Article Summary" : "Summary";
  return (
    <Container>
      <div className="mx-auto mb-12 max-w-[75rem] animate-fadeIn rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
        <div className="flex items-center justify-between pb-8">
          <h2 className="text-xl font-bold">{header}</h2>
          <div className="hidden md:block">
            <ShareLinkButton
              trackShare={trackShare}
              songDetails={songDetails}
              responseObject={markdownResponse}
              originalContent={originalContent}
              disabled={isLoadingSSE}
            />
          </div>
        </div>
        <MarkdownComponent textContent={markdownResponse.markdown} />
        {!isLoadingSSE && (
          <div className="mt-10 block md:hidden">
            <ShareLinkButton
              trackShare={trackShare}
              songDetails={songDetails}
              responseObject={markdownResponse}
              originalContent={originalContent}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default GenericResult;
