import Image from "next/image";
import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";
import { MarkdownResponse, ResponseType } from "~/types";
import { encodeStateToUrl } from "~/utils/generateLinkToShare";

const ShareLinkButton = ({
  originalContent,
  responseObject,
  disabled,
  songDetails,
  trackShare,
}: {
  originalContent: string;
  trackShare: (properties: { shareURL: string }) => void;
  responseObject: MarkdownResponse | ResponseType;
  songDetails?: string;
  disabled?: boolean;
}) => {
  const { copyToClipboard, didCopy } = useCopyToClipboard();
  return (
    <button
      onClick={() => {
        const originalContentString = originalContent;
        const encodedUrl = encodeStateToUrl(originalContentString, responseObject, songDetails);
        copyToClipboard(encodedUrl);
        trackShare({ shareURL: encodedUrl });
      }}
      className={`group relative mx-auto flex h-12 min-w-[10rem] items-center justify-center overflow-hidden rounded-full bg-primary pl-8 pr-9 text-white transition-all duration-500 hover:opacity-90 ${
        didCopy ? "disabled:opacity-90" : "disabled:opacity-60"
      } ${!didCopy && "active:top-0.5"}`}
      disabled={disabled || didCopy}
    >
      {!disabled && !didCopy && (
        <span className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine group-active:animate-shine"></span>
      )}
      <Image alt="Copy icon" src="/assets/copy-url-icon.svg" width="20" height="0" />
      <span className="ml-2">{didCopy ? "Copied" : "Copy Link"}</span>
    </button>
  );
};

export default ShareLinkButton;
