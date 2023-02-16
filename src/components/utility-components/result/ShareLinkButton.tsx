import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";
import { ResponseType } from "~/types";
import { encodeStateToUrl } from "~/utils/generateLinkToShare";

const ShareLinkButton = ({
  originalContent,
  responseObject,
}: {
  originalContent: string;
  responseObject: ResponseType;
}) => {
  const { copyToClipboard, didCopy } = useCopyToClipboard();
  return (
    <button
      onClick={() => {
        const encodedUrl = encodeStateToUrl(originalContent, responseObject);
        copyToClipboard(encodedUrl);
      }}
      className="mx-auto block h-12 min-w-[10rem] rounded-full bg-primary px-8 text-white"
    >
      {didCopy ? "Copied" : "Copy Link"}
    </button>
  );
};

export default ShareLinkButton;
