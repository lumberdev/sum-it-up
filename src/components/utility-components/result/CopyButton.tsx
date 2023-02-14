import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const { copyToClipboard, didCopy } = useCopyToClipboard();
  return (
    <button
      onClick={() => {
        copyToClipboard(textToCopy);
      }}
      className="mx-auto block h-12 rounded-full bg-primary px-8 text-white"
    >
      {didCopy ? "Copied" : "Copy"}
    </button>
  );
};

export default CopyButton;
