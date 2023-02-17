import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";
import { ResponseType } from "~/types";
import { encodeStateToUrl } from "~/utils/generateLinkToShare";
import CopyUrlIcon from "../../../assets/copy-url-icon.svg";

const ShareLinkButton = ({
  originalContent,
  responseObject,
  disabled,
}: {
  originalContent: string;
  responseObject: ResponseType;
  disabled?: boolean;
}) => {
  const { copyToClipboard, didCopy } = useCopyToClipboard();
  return (
    <button
      onClick={() => {
        const encodedUrl = encodeStateToUrl(originalContent, responseObject);
        copyToClipboard(encodedUrl);
      }}
      className={`group relative mx-auto flex h-12 min-w-[10rem] items-center justify-center overflow-hidden rounded-full bg-primary pl-8 pr-9 text-white transition-all duration-500 hover:opacity-90 ${
        didCopy ? "disabled:opacity-90" : "disabled:opacity-60"
      } ${!didCopy && "active:top-0.5"}`}
      disabled={disabled || didCopy}
    >
      {!disabled && !didCopy && (
        <span className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine group-active:animate-shine"></span>
      )}
      <CopyUrlIcon />
      <span className="ml-2">{didCopy ? "Copied" : "Copy Link"}</span>
    </button>
  );
};

export default ShareLinkButton;
