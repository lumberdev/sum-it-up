"use client";
import { useEffect, useState } from "react";
import InputComponent from "~/components/Input/Input";
import { InputFormSubmissionType, ResponseType, SongMeaningResponseType, TextSummaryResponseType } from "~/types";
import InputPageHeader from "~/components/Input/InputPageHeader";
import Result from "~/components/Result/Result";
import Loading from "~/components/Loading/Loading";
import Error from "~/components/Error/Error";
import useOpenAiSSEResponse from "~/hooks/useOpenAiSSEResponse";
import useAnalytics from "~/hooks/use-analytics";
import useFetchReadabilityOnLoad from "~/hooks/useFetchReadabilityOnLoad";
import { getStringOrFirst } from "~/typescript-helpers/type-cast-functions";
import { isValidJSON } from "~/utils/isValidJSON";
import About from "~/components/About";
import MinHeightBodyContainer from "~/components/utility-components/MinHeightBodyContainer";

export default function ClientPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const [originalContent, setOriginalContent] = useState(searchParams.original ?? "");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    data: original,
    error: err,
    isLoading: initLoadingReadability,
  } = useFetchReadabilityOnLoad(searchParams.original);

  const [displayOriginalContent, setDisplayOriginalContent] = useState(original);

  useEffect(() => {
    setDisplayOriginalContent(original);
  }, [original]);

  const [displayResult, setDisplayResult] = useState<boolean>(
    searchParams.original.length > 0 && searchParams.result.length > 0,
  );
  const [currentResult, setCurrentResult] = useState<ResponseType | null>(
    searchParams?.result &&
      isValidJSON(getStringOrFirst(searchParams.result)) &&
      JSON.parse(getStringOrFirst(searchParams.result)),
  );
  const [songDetails, setSongDetails] = useState(searchParams.songDetails.length > 0 ? searchParams.songDetails : "");

  const {
    trackInputSelection,
    trackLengthSelection,
    trackSubmit,
    trackNewSummary,
    trackRequestError,
    trackShare,
  } = useAnalytics();

  const { mutate, isLoading, isLoadingSSE, streamedResult, forceClose, isError } = useOpenAiSSEResponse({
    onSuccess: (res: ResponseType) => {
      setLocalStorage(res);
    },
    onStream: (res) => {
      setDisplayResult(true);
      setCurrentResult(res);
    },
    onReadability: (res) => {
      setDisplayOriginalContent(res.content);
    },
    onError: (err, data) => {
      if (err?.name === "insufficient length") {
        setErrorMessage(err?.message as string);
      }
      setDisplayResult(false);
      trackRequestError({ ...data, error: (err?.message as string) ?? "" });
    },
  });

  const handleFormSubmit: InputFormSubmissionType = async (
    event,
    type,
    summaryLength,
    customLength,
    inputUrl,
    text,
    songInfo = "",
  ) => {
    let validURL = inputUrl;
    // Readability requires us to send urls with the correct format, but because we want to support more forms of urls (google.com || www.google.com || https://www.google.com etc) we need to append the protocol before we send the data off.
    if (inputUrl && !/(https:\/\/)|(http:\/\/)/i.test(inputUrl)) {
      validURL = "http://" + validURL;
    }
    event.preventDefault();
    setSongDetails(songInfo);
    if (type === "text") {
      setSongDetails("");
      text?.length && setOriginalContent(text);
      text?.length && setDisplayOriginalContent(text);
    } else {
      validURL?.length && setOriginalContent(validURL);
    }

    trackSubmit({ type: type, length: customLength || summaryLength, input: validURL || text || "" });
    mutate({
      url: validURL ?? "",
      wordLimit: Number(customLength || summaryLength),
      type,
      text,
    });
  };
  const handleNewSearchBtnClick = () => {
    forceClose();
    setDisplayResult(false);
    setCurrentResult(null);
    setOriginalContent("");
    setDisplayOriginalContent("");
    setSongDetails("");
    window.history.replaceState(null, "", window.location.origin);
    trackNewSummary();
  };

  const setLocalStorage = (newData: ResponseType) => {
    const existingData = localStorage.getItem("summaries");
    if (existingData) {
      const existingDataArr: ResponseType[] = JSON.parse(existingData);
      existingDataArr.push(newData);
      localStorage.setItem("summaries", JSON.stringify(existingDataArr));
    } else {
      localStorage.setItem("summaries", JSON.stringify([newData]));
    }
  };
  if (isError) return <Error handleNewSearchBtnClick={handleNewSearchBtnClick} errorMessage={errorMessage} />;
  if (isLoading || (!displayResult && isLoadingSSE))
    return (
      <Loading
        summaryContent={originalContent}
        songDetails={songDetails}
        handleNewSearchBtnClick={handleNewSearchBtnClick}
      />
    );

  return (
    <>
      {displayResult ? (
        <MinHeightBodyContainer>
          <Result
            trackShare={trackShare}
            summaryResponse={currentResult as TextSummaryResponseType | SongMeaningResponseType}
            handleNewSearchBtnClick={handleNewSearchBtnClick}
            originalContent={originalContent}
            displayOriginalContent={displayOriginalContent}
            songDetails={songDetails}
            isLoadingSSE={isLoadingSSE}
          />
        </MinHeightBodyContainer>
      ) : (
        <>
          <MinHeightBodyContainer>
            <InputPageHeader handleNewSearchBtnClick={handleNewSearchBtnClick} />
            <InputComponent
              handleFormSubmit={handleFormSubmit}
              onInputChange={trackInputSelection}
              onLengthChange={trackLengthSelection}
            />
          </MinHeightBodyContainer>
          <About />
        </>
      )}
    </>
  );
}
