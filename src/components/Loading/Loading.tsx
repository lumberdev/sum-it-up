"use client";
import Image from "next/image";
import Container from "../utility-components/Container";

const Loading = ({
  summaryContent,
  songDetails,
  handleNewSearchBtnClick,
}: {
  summaryContent: string | string[];
  songDetails: string;
  handleNewSearchBtnClick: () => void;
}) => {
  const summaryInput = songDetails || summaryContent;
  return (
    <>
      <header className="w-full py-8 md:py-10">
        <Container className="text-center">
          <div className="mx-auto flex w-full items-center justify-between rounded-full bg-primary p-[1.4rem] md:rounded-none md:bg-transparent md:p-0">
            <div className="relative flex-1 cursor-pointer" onClick={handleNewSearchBtnClick}>
              <Image
                alt="Sum it up Logo"
                src="/assets/sum-it-up.svg"
                className="main-logo hidden w-[5.2rem] md:block md:w-[8.2rem]"
                height="0"
                width="0"
              />
              <Image
                alt="Sum it up Logo"
                src="/assets/sum-it-up-white.svg"
                className="main-logo w-[5.2rem] md:hidden"
                height="0"
                width="0"
              />
            </div>
            <div className="relative flex-1 text-right">
              <button
                className="mx-auto inline-flex h-[3.4rem] min-w-[11.1rem] items-center justify-center rounded-full border-2 border-white bg-transparent text-sm font-bold uppercase text-white md:hidden md:h-20 md:min-w-[18rem] md:border-primary md:text-lg md:text-primary"
                type="button"
                onClick={() => handleNewSearchBtnClick()}
              >
                New Summary
              </button>
              <div className="mx-auto hidden h-[4.5rem] max-w-[43rem] items-center rounded-full border-2 border-white bg-transparent px-[1rem] py-[1.4rem] text-sm font-bold uppercase text-primary  md:flex md:border-primary">
                Summarizing:
                <div
                  className={`ml-[1rem] min-w-0 truncate font-normal ${
                    songDetails ? "capitalize" : "lowercase"
                  } text-dark`}
                >
                  {summaryInput}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <div className="flex min-h-[80vh] animate-fadeIn flex-col items-center justify-center pb-10 text-center">
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <Image
            alt="Lumber Logo"
            src="/assets/On-It.svg"
            width="40"
            height="0"
            className="h-[3rem] w-[14.8rem] md:h-[4.5rem] md:w-[21.7rem]"
          />
          <Image
            src={songDetails ? "/assets/Song-Loader.gif" : "/assets/Text-Loader.gif"}
            width="0"
            height="0"
            alt="my gif"
            className="-mt-[6rem] h-[32rem] w-[32rem] md:h-[40rem] md:w-[40rem]"
            unoptimized={true}
          />
        </div>
        <div className="w-full px-[2rem] text-center md:hidden">
          <div className="mb-[1rem] font-bold uppercase text-primary">Summarizing</div>
          <div className="... flex h-[3.4rem] items-center rounded-full border-2 border-primary bg-transparent p-[2rem] text-sm text-dark">
            <div className={`min-w-0 truncate ${songDetails ? "capitalize" : "lowercase"}`}>{summaryInput}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
