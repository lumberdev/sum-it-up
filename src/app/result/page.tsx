"use client";
import { useEffect, useState } from "react";
import { ResponseType, SongMeaningResponseType, TextSummaryResponseType } from "~/types";
import Result from "~/components/Result/Result";
import { addToLocalStorage } from "~/utils/addToLocalStorage";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const [originalContent, setOriginalContent] = useState("");
  const [currentResult, setCurrentResult] = useState<ResponseType | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const original = urlParams.get("original") ?? "";
    const resultsObject = JSON.parse(urlParams.get("result") ?? "{}");
    if (originalContent.length === 0 && Object.keys(resultsObject).length === 0) {
      router.push("/");
    }
    addToLocalStorage(resultsObject);
    setOriginalContent(original);
    setCurrentResult(resultsObject);
  }, []);

  const handleNewSearchBtnClick = () => {
    router.push("/");
  };

  return (
    <Result
      summaryResponse={currentResult as TextSummaryResponseType | SongMeaningResponseType}
      handleNewSearchBtnClick={handleNewSearchBtnClick}
      originalContent={originalContent}
      songDetails={originalContent}
      isStreaming={false}
    />
  );
}
