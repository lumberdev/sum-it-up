import Image from "next/image";
import React from "react";
import Container from "../utility-components/Container";
import errorIcon from "../../assets/error.png";
import ResultPageHeader from "../Result/ResultPageHeader";

const Error = ({ handleNewSearchBtnClick }: { handleNewSearchBtnClick: () => void }) => {
  return (
    <>
      <ResultPageHeader handleNewSearchBtnClick={handleNewSearchBtnClick} />
      <Container>
        <div className="mx-auto mb-8 max-w-[75rem] animate-fadeIn rounded-[20px] border-2 border-primary bg-white py-12 px-8 md:my-20 md:p-20">
          <p className="text-center text-[1.5rem] font-bold">Sorry, Something went wrong</p>
        </div>
      </Container>
    </>
  );
};

export default Error;
