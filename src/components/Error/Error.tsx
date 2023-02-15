import Image from "next/image";
import React from "react";
import Container from "../utility-components/Container";
import errorIcon from "../../assets/error.png";

const Error = () => {
  return (
    <Container>
      <div className="flex min-h-[30rem] flex-col items-center justify-center text-center">
        <div>
          <Image src={errorIcon} alt="error" height={200} width={200} />
        </div>
        <h2 onClick={() => window.location.reload()} className="top-10 cursor-pointer text-heading3 font-bold">
          Try Again!
        </h2>
      </div>
    </Container>
  );
};

export default Error;
