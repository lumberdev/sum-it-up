"use client";
import Image from "next/image";
import React from "react";
import loaderGif from "../../assets/Text-Loader.gif";
import songLoaderGif from "../../assets/Song-Loader.gif";
import Container from "../utility-components/Container";
import SumItUpLogo from "../../assets/sum-it-up.svg";
import OnIt from "../../assets/On-It.svg";

const Loading = ({
  summaryContent,
  songDetails,
  reset,
}: {
  summaryContent: string;
  songDetails: string;
  reset: () => void;
}) => {
  const summaryInput = songDetails || summaryContent;
  return (
    <>
      <header className="w-full py-8 md:py-10">
        <Container className="text-center">
          <div className="mx-auto flex w-full items-center justify-between rounded-full bg-primary p-[1.4rem] md:rounded-none md:bg-transparent md:p-0">
            <div className="relative flex-1">
              <SumItUpLogo className="w-[5.2rem] md:w-[8.2rem] [&_path]:fill-white [&_path]:md:fill-primary" />
            </div>
            <div className="relative flex-1 text-right">
              <button
                className="mx-auto block inline-flex h-[3.4rem] min-w-[11.1rem] items-center justify-center rounded-full border-2 border-white bg-transparent text-sm font-bold uppercase text-white md:hidden md:h-20 md:min-w-[18rem] md:border-primary md:text-lg md:text-primary"
                type="button"
                onClick={() => reset()}
              >
                New Summary
              </button>
              <div className="mx-auto hidden h-[4.5rem] max-w-[43rem] items-center rounded-full border-2 border-white bg-transparent px-[1rem] py-[1.4rem] text-sm font-bold uppercase text-primary  md:flex md:border-primary">
                Summarizing:
                <div className="ml-[1rem] min-w-0 truncate font-normal capitalize text-dark">{summaryInput}</div>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <div className="flex min-h-[80vh] flex-col items-center justify-center pb-10 text-center">
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <OnIt className="h-[3rem] w-[14.8rem] md:hidden" viewBox="80 0 50 50" />
          <OnIt className="hidden h-[4.5rem] w-[21.7rem] md:block" viewBox="80 0 50 50" />
          <Image
            src={songDetails ? songLoaderGif : loaderGif}
            alt="my gif"
            className="-mt-[6rem] h-[32rem] w-[32rem] md:h-[40rem] md:w-[40rem]"
            unoptimized={true}
          />
        </div>
        <div className="w-full px-[2rem] text-center md:hidden">
          <div className="mb-[1rem] font-bold uppercase text-primary">Summarizing</div>
          <div className="... flex h-[3.4rem] items-center rounded-full border-2 border-primary bg-transparent p-[2rem] text-sm text-dark">
            <div className="min-w-0 truncate capitalize">{summaryInput}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
