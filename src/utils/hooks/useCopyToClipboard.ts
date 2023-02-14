import { useState, useEffect, useRef } from "react";

export const useCopyToClipboard = () => {
  const [didCopy, setDidCopy] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (didCopy) {
      timeoutIdRef.current = setTimeout(() => setDidCopy(false), 2000);
    }
    return () => {
      clearTimeout(timeoutIdRef.current!);
    };
  }, [didCopy]);

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setDidCopy(true);
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  };

  return { copyToClipboard, didCopy };
};
