"use client";
import { useEffect, useState } from "react";
import InputComponent from "~/components/Input/Input";
import { InputFormSubmissionType, MarkdownResponse } from "~/types";
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
import SummarizeButton from "~/components/utility-components/input/SummarizeButton";
import { openAiStorageKey } from "~/constants";
import { checkOpenAiKeyStatus } from "~/utils/check-open-ai-key-status";

export default function ClientPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const [originalContent, setOriginalContent] = useState(searchParams.original ?? "");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { data: original } = useFetchReadabilityOnLoad(searchParams.original);

  const [displayOriginalContent, setDisplayOriginalContent] = useState(original);

  useEffect(() => {
    setDisplayOriginalContent(original);
  }, [original]);

  const [displayResult, setDisplayResult] = useState<boolean>(
    searchParams.original.length > 0 && searchParams.result.length > 0,
  );
  const [currentResult, setCurrentResult] = useState<MarkdownResponse | null>(
    searchParams?.result &&
      isValidJSON(getStringOrFirst(searchParams.result)) &&
      JSON.parse(getStringOrFirst(searchParams.result)),
  );
  const [songDetails, setSongDetails] = useState(searchParams.songDetails.length > 0 ? searchParams.songDetails : "");

  const [modalOpen, setModalOpen] = useState(false);

  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  const { trackInputSelection, trackLengthSelection, trackSubmit, trackNewSummary, trackRequestError, trackShare } =
    useAnalytics();

  const { mutate, isLoading, isLoadingSSE, forceClose, isError } = useOpenAiSSEResponse({
    onSuccess: (res: MarkdownResponse) => {
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
      if (err?.name === "Length constraint violation") {
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
    event.preventDefault();
    const userHasValidKey = await checkOpenAiKeyStatus();

    if (!userHasValidKey) {
      onOpenModal(); // request token from user in pop up
      return;
    }

    let validURL = inputUrl;
    // Readability requires us to send urls with the correct format, but because we want to support more forms of urls (google.com || www.google.com || https://www.google.com etc) we need to append the protocol before we send the data off.
    if (inputUrl && !/(https:\/\/)|(http:\/\/)/i.test(inputUrl)) {
      validURL = "http://" + validURL;
    }

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
      title: songInfo,
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

  const setLocalStorage = (newData: MarkdownResponse) => {
    const existingData = localStorage.getItem("summaries");
    if (existingData) {
      const existingDataArr: MarkdownResponse[] = JSON.parse(existingData);
      existingDataArr.push(newData);
      localStorage.setItem("summaries", JSON.stringify(existingDataArr));
    } else {
      localStorage.setItem("summaries", JSON.stringify([newData]));
    }
  };

  const [openAiKeyValue, setOpenAiKeyValue] = useState("");

  const submitOpenAiKey = (event: React.SyntheticEvent) => {
    event.preventDefault();
    localStorage.setItem(openAiStorageKey, openAiKeyValue);
    onCloseModal();
    setOpenAiKeyValue("");
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
      {modalOpen && (
        <div className="fixed z-50 flex h-full w-full items-center justify-center bg-slate-400/30 backdrop-blur">
          <div className="mx-auto w-2/3 rounded-[20px] border-2 border-primary bg-background py-12 px-8 md:my-20 md:p-20">
            <form onSubmit={submitOpenAiKey} className="flex flex-col justify-center gap-2">
              <label htmlFor="openAiKey" className="text-center text-lg">
                Enter your OpenAI secret key below. Create a secret at{" "}
                <a className="text-primary" href="https://platform.openai.com/account/api-keys">
                  OpenAI
                </a>
              </label>
              <div className="flex flex-col md:flex-row">
                <input
                  className="mb-8 flex h-20 items-center justify-center rounded-full border-2 border-primary px-4 pl-6 font-medium transition-all duration-200 placeholder:font-normal placeholder:!text-dark/70 focus:outline-none focus:ring-2 focus:ring-inset md:mb-0 md:h-[5.7rem] md:flex-1 md:rounded-r-none"
                  name="openAiKey"
                  id="openAiKey"
                  value={openAiKeyValue}
                  onChange={(e) => setOpenAiKeyValue(e.target.value)}
                  type="password"
                  placeholder="Enter your OpenAI secret key"
                  required
                />
                <SummarizeButton className="md:!h-[5.7rem] md:rounded-l-none ">Submit</SummarizeButton>
              </div>
              <span className="mx-auto font-medium">
                we will never use your key (we don’t even send it to our servers)
              </span>
            </form>
          </div>
        </div>
      )}
      {displayResult ? (
        <MinHeightBodyContainer>
          <Result
            trackShare={trackShare}
            markdownResponse={currentResult as MarkdownResponse}
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
